Furniture E-commerce store project

TODO!:

- [x] aborcontroller
- [x] remove formik
- [x] remove yup
- [x] move select to its own chunk
- [x] /api/furniture changed for GET from POST
- [x] mobile menu points should not come from backend
- [x] remove /private prefix
- [x] unify success messages
- [x] switch to prisma + postgres
- [x] profile picture?
- [x] refactor server api
- [x] image compressing
- [x] should add notfound page
- [x] redirect to 404
- [x] should get all colors and brands from backend in aside
- [x] should add logging when accessing a route
- [x] redux should get user's info right after login
- [x] /login should return user data (think of which)
- [x] decide whether should do login if there is token
- [x] should redirect to login after register (modals comes in)
- [x] image name before uploads is incorrect
- [x] login returns image buffer but should not
- [x] remove cart and orders requests, they come with login
- [x] merge favorites reducer into user reducer
- [x] after submit image icon is not changing
- [x] display orders
- [x] should display rating
- [x] should refine items' color and dimensions in cart
- [x] cart item is not being removed from redux
- [x] removing from favorites does not remove from redux
- [x] mark cart and favorites icons
- [x] when not logged in items are not being added to cart
- [x] catalog aside close
- [x] productcard on buy nothing happens (should add to cart)
- [x] productcard select is not working
- [x] productcard should display colors in select (did in a row)
- [x] product shoul be added to cart with colors
- [x] getOrders is not being used?
- [x] after making order it is not dissappearing from cart
- [x] should redirect to orders when making order
- [x] profile request should not be sent if there is no changes
- [x] should add feature to cancel order
- [x] /login sends back empry orders
- [x] /product buy again removes it from cart
- [x] isolate image preparing logic (and sending user data maybe? (/login & GET /user ))
- [x] should refactor styles
- [x] add logging in protect (and refactor it)
- [x] add rewrite from /uploads to server
- [x] implement message from user
- [x] inject prisma client
- [x] change api to `/user/orders`, `/user/cart`, etc...
- [x] substitute types from prisma/client insteead of hand made types
- [x] should show snackbars when error is occured
- [x] handle something went wrong when updating profile
- [x] should add search
- [x] user should have the ability to choose whether he wants to recieve emails ("wantsToReceiveEmailUpdates": boolean)
- [x] add reviews
- [x] redesign successfull signup popup
- [x] profile popup `recieve emails` is without scroll lock
- [x] profile should not send request if none of the fields is edited
- [x] refactor styles
- [x] profile email form error message is shown but border is not
- [x] product 404 if undefined
- [x] profile tabs borders design
- [x] should add mobile user menu
- [x] should only upload `.png` or `.jpg` files
- [x] profile should redirect to login if not authorized
- [x] catalog items loader should be centered
- [x] favorites label should be in english
- [x] profile no loading while updating
- [x] should implement github-ci
- [x] add universal button component to set type, title, aria-label automatically
- [x] check for z-indexes everywhere
- [x] /contacts form redesign
- [x] should disable buttons and inputs while making submit requests
- [x] moving to nestjs
- [x] add login via yandex
- [x] signup server errors indication
- [x] cancel profile filling
- [x] signup error messages not in english
- [x] login via yandex popup with email shows every time
- [x] cart item mobile view is messed up
- [x] should add shipping methods and specs on furniture
- [x] Profile tabs are broken
- [x] making product favorite is not working with store
- [x] PUT /user male phone optional
- [x] cart total split with spaces
- [x] make sure that user data sanitized is of correct type
- [x] card liked is above search dropdown
- [x] search found item has no image
- [x] cannot close search dropdown
- [x] after creating orders corresponding tabs doesnt open
- [x] orders table is seems broken
- [x] profile order error when trying to cancel
- [x] productcard onselect is broken
- [x] orders comes with no products
- [x] items are not being added to cart
- [x] move svgs to separate files respectively
- [x] strict tsconfig
- [x] furniture/:id return 404 if null
- [x] remove [data] prop from furnitureReviews attachments
- [x] /product/id add ui if no reviews
- [x] remove card bottom if it doesnt fit
- [x] discount is not correctly calculated
- [x] add sqlite option
- [x] correct footer links
- [x] display those products which are on sale
- [x] catalog add top sales products
- [x] remove new arrivals section
- [x] on mobile cannot close search
- [x] picture in card can be any size
- [x] header sublists are broken
- [x] how products rating is scored?
- [x] show reviews in cards
- [x] reviews attachedPictures should be no data
- [x] breadcrumbs in catalog are broken
- [x] reviews img if no avatar is broken
- [x] user should not leave review if he just did it
- [x] no "All" option in selects
- [x] should show no stars if 0 reviews in card and in product (grey star actually)
- [x] add `You may also like` block with products of the same `type`
- [x] after going from one product to another should be scroll up
- [x] add `You may also like` block with products of the same `type`
- [x] after going from one product to another should be scroll up
- [x] translate contacts page
- [x] change links in mobile menu
- [ ] mark in swagger which id to send
- [ ] /login swagger edit response types
- [ ] nestjs swagger
- [ ] at the start two equal api call `api/furniture` in catalog
- [ ] add confirmation email
- [ ] after login via yandex login shows in a moment before profile
- [ ] add remaining products
- [ ] user gets exprired in a middle of using site
- [ ] loader while fetching user data? (react-query) (nextjs is better)
- [ ] write backend tests
- [ ] catalog specific product when loading first shows 404 and then the product itself (this is because spa)
- [ ] type controller's outputs
- [ ] selecting option from header doesnt trigger products refetching
- [ ] orders with same date are not sorted right when adding new order only before reload
- [ ] filter furniture by brand
- [ ] should sanitize furniture after fetching
- [ ] /profile name is not being updated
- [ ] translate about us page
