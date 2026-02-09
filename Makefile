.PHONY: dev build clean install

# Install dependencies and run dev server
make: install dev

# Install dependencies
install:
	npm install

# Run development server
dev:
	npm run dev

# Build for production
build:
	npm run build

# Clean build artifacts and reinstall
clean:
	rm -rf .next node_modules
	npm install

# Lint the project
lint:
	npm run lint
