# Load-More-Products-Project

![Load-More-Products-Project](Load-More-Products-Project.gif)

State Setup:
We're using the useState hook to manage four state variables: products, loading, disableButton, and initialLoad.
products stores the array of products fetched from the API.
loading indicates whether data is being fetched from the API.
disableButton disables the "Load More" button when all products are loaded.
initialLoad keeps track of whether it's the initial load of products.
Ref Setup:
We're using the useRef hook to create a mutable ref called skipRef.
This ref is used to keep track of the number of products skipped in pagination.
Fetch Products Function:
The fetchProducts function is an asynchronous function responsible for fetching products from the API.
It sets loading to true to indicate that data is being fetched.
It constructs the URL for the API call using the current value of skipRef.
It fetches the products from the API using fetch and await.
Upon receiving the response, it parses the JSON data.
If products are present in the response:
If it's the initial load, it directly sets the products retrieved from the API. Otherwise, it appends the new products to the existing list.
It updates skipRef.current to keep track of the number of products fetched.
If the number of products fetched is less than 20, it disables the "Load More" button.
If no products are fetched, it disables the "Load More" button.
UseEffect Hook:
We're using the useEffect hook to call fetchProducts when the component mounts ([] dependency array ensures it runs only once).
Load More Function:
The loadMore function is called when the "Load More" button is clicked.
It simply calls the fetchProducts function, initiating another fetch to load more products.
Rendering:
The component renders the product items fetched from the API.
It maps over the products array and renders each product as a <div> element with an image and a title.
If loading is true, it displays a loading indicator (<div>Loading...</div>).
The "Load More" button is rendered with appropriate disabled state based on the value of disableButton. If all products are loaded, it displays a message indicating that all products have been loaded.
