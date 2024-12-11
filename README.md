# Member-Management-System
Take Away assignment for MERN developer Role

M.E.R.N Member Management System

# Development and Debugging Process

1. Initial Setup and Planning
   - During the initial stages of the project, the goal was to develop a Member Management System
   using the MERN stack with SQLite for the database. The system neede to include secure user registration,
   profile management, CRUD operations, and the ability to upload profile pictures.

	# Challenges:
	- Deciding on the tech stack that would work well together
	- Setting up the database and ensuring all models were corrctly defined.

	# Approach:
	- Chose Node.js and Express.js for the backend due to their performance and scalability.
	- USed React.js for the frontend, boostrap for styling and leveraging React Router for navigation.
	- SQLite was used as a lightweight database, which was ideal for this project.

2. Profile Management and Image Uploads
   - A key feature of the system was the ability for users to upload profile pictures. To handle this, Cloudinary 
 was integrated into the backend to store images remotely.

	# Challenges
   	- Managing file uploads and ensuring the images were stored securely and efficiently.
	- Handling various file formats and ensuring that the upload process was smooth and error-free.

	# Approach:
	- Used Cloudinary for image uploads, which provided a seamless way to manage and serve images.
	- Integrated Multer to handle the file uploads in the backend, saving images directly to Cloudinary.
	- Encountered debugging challenges around ensuring correct images formats and file sizes were uploaded.
	- Solved these by setting up appropriate validation checks in the upload middleware.

3. CRUD Operations and Profile Updates
- CRUD operations were implemented to allow users to create, read, update, and delete their profiles. 
 The profile management system included updating personal information such as name, email, and profile picture.

	# Challenges
	- Ensuring data integrity and consistency when users updated their profiles.
	- Handling errors that might arise from inconsistent database states or failed updates.

	# Approach
	- Implemented validation checks for the user inputs.
	- For debugging, I used console logs and Postman to test backend endpoint routes and trace any issues 
	with data updates, especially when handling image URL storage after a successful upload.

4. Debugging Process
   Key Debugging Steps:
   a) Issue with Profile Picture Upload
	Problem => Sometimes, the profile picture would not display correctly after uploading.
	Solution => I checked the image URL returned from CLoudinary and ensured it was correctly saved in the database.
	This involed logging the response from Cloudinary and verifying the image path stored in the user record.

   b) Profile Update Errors
	Problem => Errors would sometimes appear when trying to update user profiles.
	Solution => I tracked the issue by examining the request payload and the response from the backend.
	It turns out that the user data is not being validated properly before saving to the database, leading to failed updates.

5. Final Testing and Deployment
      - Once all features were implemented and issues were resolved, I performed final testing on the entire system to ensure everything worked as expected. 
      - This included testing registration, login, CRUD operations, profile updates and image uploads.
	# Challenges:
	- Testing the application in different environments and ensuring the backend was properly connected to CLoudinary.

Current Bug
Issue: The login functionality is currently failing due to the following errors:
404 (Not Found): Indicates that the backend endpoint /user/login could not be reached.
Unexpected token <: Suggests that the frontend is receiving an HTML response instead of the expected JSON, typically caused by a server-side error or incorrect endpoint routing.

Debugging Attempts
Checked Backend Route:

Verified that the /user/login route is defined in the backend with the correct HTTP method (POST).
Ensured the server is listening on the correct port (8080).
Tested API Endpoint:

Used Postman to send requests to the /user/login endpoint.
Confirmed the backend route works independently.
Frontend Fetch Logic:

Verified the fetch call in the frontend uses the correct URL (http://localhost:8080/user/login).
Ensured the Content-Type header is set to application/json.
Console Debugging:

Logged the request and response in both frontend and backend to trace the issue.
Cross-Origin Resource Sharing (CORS):

Checked for any potential CORS issues that might prevent the frontend from communicating with the backend.
Despite these efforts, the bug persists. Due to time constraints, I could not fully resolve this issue.



