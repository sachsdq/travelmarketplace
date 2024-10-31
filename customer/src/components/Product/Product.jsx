import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import ProductCard from './ProductCard'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from '@mui/material/Pagination';
import { getAllProduct } from '../../State/Product/Action'

const sortOptions = [
  { name: 'Phổ biến nhất', href: '#', current: true },
  { name: 'Đánh giá tốt nhất', href: '#', current: false },
  { name: 'Mới nhất', href: '#', current: false },
  { name: 'Giá: Thấp tới cao', href: '#', current: false },
  { name: 'Giá: Cao tới thấp', href: '#', current: false },
]
const subCategories = [
  { id:'hotel',name: 'Khách sạn', href: '#' },
  { id:'rent',name: 'Thuê xe', href: '#' },
  { id:'device',name: 'Thiết bị', href: '#' },
  { id:'tour',name: 'Tour du lịch', href: '#' },
  { id:'other',name: 'Khác', href: '#' },
]
const filters = [
  
    {
      id: 'sanpham',
      name: 'Sản phẩm',
      options: [
        { value: 'white', label: 'White', checked: false },
        { value: 'beige', label: 'Beige', checked: false },
        { value: 'blue', label: 'Blue', checked: false },
        { value: 'brown', label: 'Brown', checked: false },
        { value: 'green', label: 'Green', checked: false },
        { value: 'purple', label: 'Purple', checked: false },
      ],
    },
    {
      id: 'thuonghieu',
      name: 'Thương hiệu',
      options: [
        { value: 'new-arrivals', label: 'New Arrivals', checked: false },
        { value: 'sale', label: 'Sale', checked: false },
        { value: 'travel', label: 'Travel', checked: false },
        { value: 'organization', label: 'Organization', checked: false },
        { value: 'accessories', label: 'Accessories', checked: false },
      ],
    },
    {
      id: 'danhgia',
      name: 'Đánh giá',
      options: [
        { value: '1', label: '1 sao', checked: false },
        { value: '2', label: '2 sao', checked: false },
        { value: '3', label: '3 sao', checked: false },
        { value: '4', label: '4 sao', checked: false },
        { value: '5', label: '5 sao', checked: false },
      ],
    },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [searchInputValue,setSearchInputValue] = useState("")
  const [filterProduct, setFilterProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [suggestions, setSuggestions] = useState([
    'Tour','Nha Trang','Đà Nẵng','Thành phố Hồ Chí Minh','Hà Nội',
    'Lều cắm trại','Dụng cụ nấu ăn','Balo, túi xách','Giầy đi bộ','Vali du lịch',
  ]);

  const location = useLocation()
  const navigate = useNavigate()
  const param = useParams()
  const dispatch = useDispatch()
  const {products} = useSelector(store=>store)
  
  const handleInputChange = (e) => {
    setSearchInputValue(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowResults(false);
  };
  // const decodedQueryString = decodeURIComponent(location.search)
  // const searchParams = new URLSearchParams(decodedQueryString)

  const handlePaginationChange=(event,value)=>{
    const searchParams = new URLSearchParams(location.search)
    searchParams.set("page",value)
    const query=searchParams.toString()
    navigate({search:`?${query}`})
  }

  const handleFilter = (value, sectionId)=>{
    const searchParams = new URLSearchParams(location.search)

    let filterValue = searchParams.getAll(sectionId)

    if(filterValue.length>0 && filterValue[0].split(",").includes(value)){
      filterValue=filterValue[0].split(",").filter((item)=>item!==value)

      if(filterValue.length===0){
        searchParams.delete(sectionId)
      }
    }
    else{
      filterValue.push(value)
    }

    if(filterValue.length>0){
      searchParams.set(sectionId,filterValue.join(","))
    }
    const query = searchParams.toString()
    navigate({search:`?${query}`})
  }

  // const handleRadioFilterChange = (e,sectionId)=>{
  //   const searchParams = new URLSearchParams(location.search)

  //   searchParams.set(sectionId, e.target.value)
  //   const query = searchParams.toString()
  //   navigate({search:`?${query}`})
  // }

  useEffect(() => {
    // const newFilterProduct = products.products.filter((items) => {
    //   return items.title.toLowerCase().includes(searchInputValue.toLocaleLowerCase());
    // });
    // setFilterProduct(newFilterProduct);

    if (products.products.length > 0) {
      const newFilterProduct = products.products.filter((items) => {
        return items.title.toLowerCase().includes(searchInputValue.toLowerCase());
      });
      setFilterProduct(newFilterProduct);

      const newSuggestions = products.products
        .filter((item) => item.title.toLowerCase().includes(searchInputValue.toLowerCase()))
        .map((item) => item.title)
        .slice(0, 5);
      setSuggestions(newSuggestions);
    }
  }, [products.products, searchInputValue]);

  useEffect(()=>{
    const data = {}
    dispatch(getAllProduct(data))
  },[dispatch])

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href} className="block px-2 py-3">
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-4">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                    onChange={()=> handleFilter(option.value, section.id)}
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Tất cả sản phẩm</h1>

            {/* Thanh tìm kiếm */}
            {/* <div class="w-[25rem] h-8 flex items-center border border-gray-300 rounded-full px-3 py-1">
              <input
                type="text"
                id='search'
                value={searchInputValue}
                onChange={(e)=>{setSearchInputValue(e.target.value)}}
                class="w-full h-full flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
                placeholder="Tìm kiếm ..."
                autoComplete='off'
              />
              <button class="bg-transparent outline-none cursor-pointer">
                <svg
                  class="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
            </div> */}
            {/* <div className="relative w-[25rem] h-8 flex items-center border border-gray-300 rounded-full px-3 py-1">
              <div className="relative flex-1">
                <input
                  type="text"
                  id="search"
                  value={searchInputValue}
                  onChange={handleInputChange}
                  className="w-full h-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
                  placeholder="Tìm kiếm ..."
                  autoComplete="off"
                />
                {showResults && (
                  <div className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 overflow-hidden">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                          searchTerm === suggestion ? 'bg-gray-100' : ''
                        }`}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button className="bg-transparent outline-none cursor-pointer">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
            </div> */}
            <div>
              <div className="relative w-[25rem]">
                <div className="w-full h-8 flex items-center border border-gray-300 rounded-full px-3 py-1">
                <div className="relative flex-1">
                  <input
                    type="text"
                    id="search"
                    value={searchInputValue}
                    onChange={handleInputChange}
                    className="w-full h-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
                    placeholder="Tìm kiếm ..."
                    autoComplete="off"
                  />
                  {suggestions.length > 0 && showResults && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 overflow-hidden">
                      {suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                            searchInputValue === suggestion ? 'bg-gray-100' : ''
                          }`}
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button className="bg-transparent outline-none cursor-pointer">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </button>
                </div>
                {/* {suggestions.length > 0 && (
                  <ul className="absolute top-10 left-0 w-full bg-white shadow-md rounded-md z-10">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {suggestion}
                      </li>
                  ))}
                  </ul>
                )} */}
              </div>
            </div>


            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                  
                    <li>
                      <Link to='/product/hotel'>Khách sạn</Link>
                    </li>
                    <li>
                      <Link to='/product/rent'>Thuê xê</Link>
                    </li>
                    <li>
                      <Link to='/product/device'>Thiết bị</Link>
                    </li>
                    <li>
                      <Link to='/product/tour'>Tour du lịch</Link>
                    </li>
                  {/* {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))} */}
                </ul>

                {/* {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                onChange={()=> handleFilter(option.value, section.id)}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))} */}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-4 w-full">
                <div className='flex flex-wrap justify-content bg-white py-5'>
                {/* {products && products.products?.map((item) => (
                    <ProductCard product={item}/>
                    ))} */}
                    {filterProduct && filterProduct?.map((item) => (
                    <ProductCard product={item}/>
                    ))}
                    {/* {data.map((item)=> <ProductCard product={item}/>)} */}
                    {/* <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/> */}
                </div>
              </div>
            </div>
          </section>

          {/* PageNumber */}
          <section className='w-full px=[3.6rem]'>
            <div className='px-4 py-5 flex justify-center'>
              <Pagination count={filterProduct?.totalPages} color="secondary" onChange={handlePaginationChange}/>
              {/* <Pagination count={5} color="secondary" onChange={handlePaginationChange}/> */}
              {/* <Pagination count={5} color="secondary" /> */}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
