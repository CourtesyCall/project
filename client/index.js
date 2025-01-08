





// $(document).ready(function (){
//     setTimeout(function () {
//         $.ajax({
//             url: 'http://localhost:3000/products',
//             type: 'get',
//             data: {},
//             success: function (data){
//                 console.log(data)
//             }
//         })
//     }, 1000)
//
// });


$(document).ready(function() {
    let currentPage = 1; // Current page for pagination
    let searchQuery = ''; // The search query for filtering products

    // Function to load the list of products and render them in the table
    function fetchProducts(page = currentPage, search) {
        const pageSize = 10; // Number of products per page

        // Construct the query string for the fetch request
        let queryString = `http://localhost:3000/products?page=${page}&pageSize=${pageSize}`;

        // If search is provided and it's a number, search by id
        if (search) {
            if (!isNaN(search)) {
                // Search by id
                queryString += `&id=${search}`;
            } else {
                // Search by name
                queryString += `&search=${search}`;
            }
        }

        // Execute the fetch request
        fetch(queryString)
            .then(response => response.json())
            .then(data => {
                // If no products are found and the page is greater than 1, show an error
                if (data.products.length === 0 && page > 1) {
                    showErrorAlert('No more products to display.');
                    return;
                }
                renderTable(data); // Render the products in the table
                console.log(data);
                updatePagination(data.totalCount); // Update pagination
            })
            .catch(error => {
                console.error("Error:", error); // Debugging
                showErrorAlert(error.message); // Show the error message
            });
    }

    // Function to show error alerts with Bootstrap styling
    function showErrorAlert(errorMessage) {
        console.log('Alert');
        $('#unSuccessAlert').addClass('show').removeClass('fade'); // Show the alert
        $('#unSuccessAlert .alert-text').text(errorMessage); // Set the error message

        // Hide the alert after 5 seconds
        setTimeout(function() {
            $('#unSuccessAlert').removeClass('show').addClass('fade');
        }, 5000);
    }

    // Function to render the products in the table
    function renderTable(products) {
        const table = $('#response');
        console.log(products);
        table.empty(); // Clear the table before rendering

        // Loop through the products and create table rows
        products.products.forEach(product => {
            const formattedDate = product.startedSale.slice(0, 10); // Format the sale start date

            table.append(`
                <tr>
                    <td><img src="${product.image}" alt="Image" width="50"></td>
                    <td data-id="${product.id}">${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>${product.description}</td>
                    <td>${formattedDate}</td>
                    <td>
                        <button class="btn btn-warning btn-sm edit-btn">Edit</button>
                        <button class="btn btn-danger btn-sm delete-btn">Delete</button>
                    </td>
                </tr>
            `);
        });
    }

    // Function to update the pagination based on the total number of products
    function updatePagination(totalCount) {
        const pagination = $('#pagination');
        pagination.empty(); // Clear existing pagination

        const pageSize = 10;
        const totalPages = Math.ceil(totalCount / pageSize); // Calculate the total number of pages

        // Loop through the total number of pages and create pagination links
        for (let i = 1; i <= totalPages; i++) {
            pagination.append(`
                <li class="page-item" id="page-${i}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `);
        }
    }

    // Load the list of products when the page is loaded
    fetchProducts();

    // Handler for the "Save Product" button
    $('#saveProduct').click(function() {
        // Collect data from the form
        const productName = $('#productName').val();
        const imageProduct = $('#imageProduct').val();
        const description = $('#description').val();
        const startDate = $('#startDate').val();
        const priceProduct = $('#price').val();

        // Generate a unique ID for the product using the current timestamp
        let productId = Date.now(); // Use current timestamp in milliseconds

        // Get the current date for createdAt in ISO format
        const createdAt = new Date(productId).toISOString(); // ISO 8601 format

        // Convert the start date to ISO 8601 format
        const startedSale = new Date(startDate).toISOString(); // ISO 8601 format

        console.log(startedSale);

        // Create the product data object
        const productData = {
            name: productName,
            description: description,
            image: imageProduct,
            price: priceProduct, // Product price
            createdAt: createdAt,
            startedSale: startedSale
        };

        // Make the POST request to save the product
        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to save product');
                }
                return response.json();
            })
            .then(data => {
                console.log('Product saved:', data);

                // Show success alert
                $('#successAlert').addClass('show').removeClass('fade');

                // Hide the success alert after 3 seconds
                setTimeout(function() {
                    $('#successAlert').removeClass('show').addClass('fade');
                    $('#productModal').modal('hide'); // Close the modal
                }, 3000);

                // Reload the product list after saving
                fetchProducts(); // Reload products from the server
            })
            .catch(error => {
                showErrorAlert(error.message); // Show error alert if saving fails
            });
    });

    // Handler for the "Search" button
    $('#searchBtn').click(function() {
        searchQuery = $('#searchQuery').val(); // Get the search query from the input
        console.log(searchQuery);

        // Reload the products list with the current search query
        fetchProducts(currentPage, searchQuery);
    });

    // Handler for the "Cancel" button
    $('#cancel').click(function() {
        // Close the modal when cancel is clicked
        $('#productModal').modal('hide');
    });

    // Handler for the "Edit" button
    $(document).on('click', '.edit-btn', function() {
        const productId = $(this).closest('tr').find('td[data-id]').data('id');

        fetch(`http://localhost:3000/products/${productId}`)
            .then(response => response.json())
            .then(product => {
                $('#productName').val(product.name);
                $('#imageProduct').val(product.image);
                $('#description').val(product.description);
                $('#startDate').val(product.startedSale.slice(0, 10)); // Use only YYYY-MM-DD for the date
                $('#price').val(product.price);

                // Save updated product data
                $('#saveProduct').off('click').on('click', function() {
                    const updatedProductData = {
                        name: $('#productName').val(),
                        description: $('#description').val(),
                        image: $('#imageProduct').val(),
                        price: $('#price').val(), // Product price
                        startedSale: $('#startDate').val(),
                    };

                    fetch(`http://localhost:3000/products/${productId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updatedProductData)
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Failed to update product');
                            }
                            return response.json();
                        })
                        .then(data => {
                            $('#successAlert').addClass('show').removeClass('fade');
                            setTimeout(() => {
                                $('#successAlert').removeClass('show').addClass('fade');
                                $('#productModal').modal('hide');
                            }, 3000);
                            fetchProducts();
                        })
                        .catch(error => {
                            showErrorAlert(error.message);
                        });
                });

                $('#productModal').modal('show');
            })
            .catch(error => {
                showErrorAlert(error.message);
            });
    });

    // Handler for the "Delete" button
    $(document).on('click', '.delete-btn', function() {
        const productId = $(this).closest('tr').find('td[data-id]').data('id');
        console.log(productId);
        if (confirm('Are you sure you want to delete this product?')) {
            fetch(`http://localhost:3000/products/${productId}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to delete product');
                    }
                    return response.json();
                })
                .then(data => {

                    if (data.success) {
                        $('#successAlert').addClass('show').removeClass('fade');
                        setTimeout(() => {
                            $('#successAlert').removeClass('show').addClass('fade');
                        }, 3000);
                        fetchProducts(); // Reload the product list
                    } else {
                        showErrorAlert(data.message); // Show error message if product not found
                    }
                })
                .catch(error => {
                    console.log(error);
                    showErrorAlert(error.message);
                    fetchProducts();
                });
        }
    });

    // Handle click on pagination links
    $(document).on('click', '.page-link', function(event) {
        event.preventDefault(); // Prevent the default link behavior

        // Remove 'active' class from all pagination links
        $('.page-item').removeClass('active');

        // Add 'active' class to the clicked page link
        $(this).closest('.page-item').addClass('active');

        // Get the page number from the clicked link
        const page = $(this).data('page');

        currentPage = page; // Update the current page
        fetchProducts(page); // Reload products for the selected page
    });
});



