/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { FiSearch, FiChevronDown, FiChevronUp, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useGetProductQuery } from '@/redux/features/admin/productsmanagement';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Out of Stock';
  createdAt: string;
}

const ProductTable = () => {
  const { data: productData, isLoading, isError } = useGetProductQuery(undefined);
  const [products, setProducts] = useState<Product[]>([]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'In Stock' | 'Out of Stock'>('All');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Product; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fixed status calculation with proper type safety
  useEffect(() => {
    if (productData?.data) {
      const transformedData = productData.data.map((item: any) => ({
        _id: item._id || '',
        name: item.name || 'Unnamed Product',
        category: item.category || 'Uncategorized',
        price: Number(item.price) || 0,
        stock: Number(item.stock) || 0,
        status: (Number(item.stock) || 0) > 0 ? 'In Stock' : 'Out of Stock', // Fixed status calculation
        createdAt: item.createdAt ? new Date(item.createdAt).toISOString().split('T')[0] : 'Unknown Date'
      }));
      setProducts(transformedData);
    }
  }, [productData]);

  const categories = ['All', ...new Set(products.map(item => item.category).filter(Boolean))];

  // Fixed status filtering logic
  const filteredData = products
    .filter(product => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.price.toString().includes(term) ||
        product.stock.toString().includes(term) ||
        product.status.toLowerCase().includes(term) ||
        product.createdAt.includes(term)
      );
    })
    .filter(product => {
      const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
      const matchesStatus = statusFilter === 'All' || product.status === statusFilter; // Fixed status filter
      return matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      if (!sortConfig) return 0;
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const requestSort = (key: keyof Product) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const headers = [
    { key: 'name', label: 'Product Name' },
    { key: 'category', label: 'Category' },
    { key: 'price', label: 'Price' },
    { key: 'stock', label: 'Stock' },
    { key: 'status', label: 'Status' },
    { key: 'createdAt', label: 'Date Added' },
  ];

  if (isLoading) return <div className="p-4 text-center">Loading products...</div>;
  if (isError) return <div className="p-4 text-center text-red-500">Error loading products</div>;
  if (!products.length) return <div className="p-4 text-center">No products available</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as 'All' | 'In Stock' | 'Out of Stock'); // Fixed status filter type
              setCurrentPage(1);
            }}
          >
            <option value="All">All Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map(header => (
                <th
                  key={header.key}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort(header.key as keyof Product)}
                >
                  <div className="flex items-center">
                    {header.label}
                    {sortConfig?.key === header.key && (
                      sortConfig.direction === 'asc' ? 
                        <FiChevronUp className="ml-1" /> : 
                        <FiChevronDown className="ml-1" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.length > 0 ? (
              currentItems.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{product.stock}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${product.status === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.createdAt}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="px-6 py-4 text-center text-sm text-gray-500">
                  No products found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredData.length > 0 && (
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between">
          <div className="mb-2 sm:mb-0">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, filteredData.length)}
              </span>{' '}
              of <span className="font-medium">{filteredData.length}</span> results
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-100 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              <FiChevronLeft />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-100 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;