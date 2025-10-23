import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { Order } from '@/types';

const ORDERS_COLLECTION = 'orders';

// Generate order number
function generateOrderNumber(): string {
  const prefix = 'NK';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

// Create order
export async function createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Promise<Order> {
  try {
    const orderNumber = generateOrderNumber();
    const now = new Date();

    const order: Order = {
      ...orderData,
      id: '', // Will be set by Firestore
      orderNumber,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = doc(collection(db, ORDERS_COLLECTION));
    await setDoc(docRef, {
      ...order,
      id: docRef.id,
      createdAt: Timestamp.fromDate(now),
      updatedAt: Timestamp.fromDate(now),
    });

    return { ...order, id: docRef.id };
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

// Get order by ID
export async function getOrder(orderId: string): Promise<Order | null> {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, orderId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as Order;
    }
    return null;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
}

// Get user orders
export async function getUserOrders(userId: string): Promise<Order[]> {
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as Order;
    });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
}

// Update order status
export async function updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    await setDoc(
      orderRef,
      {
        status,
        updatedAt: Timestamp.fromDate(new Date()),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}

// Update tracking number
export async function updateTrackingNumber(orderId: string, trackingNumber: string): Promise<void> {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    await setDoc(
      orderRef,
      {
        trackingNumber,
        updatedAt: Timestamp.fromDate(new Date()),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Error updating tracking number:', error);
    throw error;
  }
}
