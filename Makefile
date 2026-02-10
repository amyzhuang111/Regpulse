.PHONY: dev build clean install db-setup lint

# Default: install dependencies and run dev server
all: install dev

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

# Print instructions for setting up the database
db-setup:
	@echo "=== Supabase Database Setup ==="
	@echo ""
	@echo "1. Go to your Supabase project dashboard"
	@echo "2. Navigate to SQL Editor"
	@echo "3. Open and run: supabase/migrations/001_initial_schema.sql"
	@echo "4. This will create tables: profiles, rules, calls, violations, evidence"
	@echo "5. It will also seed 8 regulatory rules"
	@echo ""
	@echo "Make sure your .env.local has these values from Supabase Settings → API:"
	@echo "  NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co"
	@echo "  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key"
	@echo "  SUPABASE_SERVICE_ROLE_KEY=your-service-role-key"
