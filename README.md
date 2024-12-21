# Blogging Platform API

This API allows users to manage blogs with features based on user roles (Admin and User) and supports authentication, authorization, and blog management functionalities.

## Live URL: [Blogging Platform Server](https://blogging-platform-riq5anv3z-amzud-uddin-shamims-projects.vercel.app/)

## Key Features:

- ### User Roles:
  - Admin: Can delete any blog, block users, but cannot update blogs.
  - User: Can register, log in, create, update, and delete their own blogs.
- ### Authentication & Authorization:
  - Users must be logged in to create, update, or delete blogs.
  - Admin and User roles have different permissions.
- ### Blog Management:
  - Users can create, update, and delete their own blogs.
  - Blogs can be searched, sorted, and filtered via public API.

## API Endpoints:

- ### Authentication:
  - Register: `/api/auth/register` Create a new user.
  - Login: `/api/auth/login` Authenticate a user and generate a JWT token.
- ### Blog Management:
  - Get Blogs: `/api/blogs` Public endpoint to view all blogs with search, sort, and filter options.
  - Create Blog: `/api/blogs` Authenticated users can create blogs.
  - Update Blog: `/api/blogs/:id` Users can update their own blogs.
  - Delete Blog: `/api/blogs/:id` Users can delete their own blogs.
- ### Admin Actions:
  - Block User: `/api/admin/users/:userId/block` Admin can block users.
  - Delete Blog: `/api/admin/blogs/:id` Admin can delete any blog.
