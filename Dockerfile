FROM nginx:alpine

# Clear any previous files to avoid conflicts
RUN rm -rf /usr/share/nginx/html/*

# Copy the application files to the nginx html directory
COPY . /usr/share/nginx/html/

# Ensure CSS and JS directories are properly copied
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY images/ /usr/share/nginx/html/images/

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]