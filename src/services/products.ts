import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type {
  Product,
  ProductFilters,
  SortOption,
  PaginatedResponse,
  PaginationParams,
} from '@/types';

const PRODUCTS_COLLECTION = 'products';

// Get single product by ID
export async function getProduct(id: string): Promise<Product | null> {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

// Get products with filters, sorting, and pagination
export async function getProducts(
  filters?: ProductFilters,
  sortOption: SortOption = 'featured',
  pagination?: PaginationParams,
  lastDoc?: QueryDocumentSnapshot
): Promise<PaginatedResponse<Product>> {
  try {
    let q = query(collection(db, PRODUCTS_COLLECTION));

    // Apply filters
    if (filters) {
      if (filters.categories && filters.categories.length > 0) {
        q = query(q, where('category', 'in', filters.categories));
      }
      if (filters.sports && filters.sports.length > 0) {
        q = query(q, where('sport', 'in', filters.sports));
      }
      if (filters.gender && filters.gender.length > 0) {
        q = query(q, where('gender', 'in', filters.gender));
      }
      if (filters.priceRange) {
        q = query(
          q,
          where('price', '>=', filters.priceRange.min),
          where('price', '<=', filters.priceRange.max)
        );
      }
      if (filters.inStock) {
        q = query(q, where('variants', 'array-contains', { stock: { '>=': 1 } }));
      }
      if (filters.rating) {
        q = query(q, where('rating', '>=', filters.rating));
      }
    }

    // Apply sorting
    switch (sortOption) {
      case 'createdAt-desc':
        q = query(q, orderBy('createdAt', 'desc'));
        break;
      case 'price-asc':
        q = query(q, orderBy('price', 'asc'));
        break;
      case 'price-desc':
        q = query(q, orderBy('price', 'desc'));
        break;
      case 'rating-desc':
        q = query(q, orderBy('rating', 'desc'));
        break;
      default:
        q = query(q, orderBy('featured', 'desc'), orderBy('createdAt', 'desc'));
    }

    // Apply pagination
    if (pagination) {
      q = query(q, limit(pagination.limit));
      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }
    }

    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];

    return {
      data: products,
      pagination: {
        total: querySnapshot.size,
        page: pagination?.page || 1,
        limit: pagination?.limit || products.length,
        totalPages: Math.ceil(querySnapshot.size / (pagination?.limit || 1)),
        hasMore: querySnapshot.docs.length === pagination?.limit,
      },
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

// Get featured products
export async function getFeaturedProducts(limitCount: number = 8): Promise<Product[]> {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('featured', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }
}

// Get related products
export async function getRelatedProducts(
  productId: string,
  category: string,
  limitCount: number = 4
): Promise<Product[]> {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('category', '==', category),
      where('id', '!=', productId),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch (error) {
    console.error('Error fetching related products:', error);
    throw error;
  }
}

// Search products
export async function searchProducts(searchTerm: string): Promise<Product[]> {
  try {
    // Note: This is a basic implementation. For production, use Algolia or similar
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('status', '==', 'active')
    );

    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];

    // Client-side filtering for search
    const lowercaseSearch = searchTerm.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseSearch) ||
        product.description.toLowerCase().includes(lowercaseSearch) ||
        product.tags.some((tag) => tag.toLowerCase().includes(lowercaseSearch))
    );
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
}
