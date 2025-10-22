interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;

  return (
    <div>
      <h1>Product Detail - {id}</h1>
      {/* Product images */}
      {/* Product info */}
      {/* Size/color selector */}
      {/* Add to cart */}
      {/* Reviews */}
      {/* Related products */}
    </div>
  );
}
