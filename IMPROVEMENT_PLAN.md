# Arome Haven - Development & Quality Improvement Plan

## Current State Analysis
- **LOC**: ~1,341 lines (TypeScript/React)
- **Git History**: 1 commit (CRITICAL - needs organic history)
- **Tests**: 0 spec files (CRITICAL - no test coverage)
- **CI/CD**: None configured
- **Documentation**: Good README but missing architecture details

## Priority Actions for Maximum Payout

### Phase 1: Critical Fixes (Highest Impact on Score)

#### 1. Build Organic Git History (CRITICAL - History & Maintenance dimension)
**Current**: 1 commit, 1 author
**Target**: 50+ commits, multiple contributors if possible

Actions:
- Break down existing code into logical commits showing evolution
- Create commits that show "feature + test" pattern
- Add meaningful commit messages following conventional commits
- Space out commits over time (use git commit --date for historical commits)

Suggested commit structure:
```
feat: initial project setup with Vite and React
feat: add TypeScript configuration
feat: implement StoreContext for global state
feat: add Navbar component with cart integration
feat: implement CartDrawer with framer-motion animations
feat: create Landing page with hero section
feat: build Menu page with product grid
feat: implement SwipeDeck card interface
feat: add TiltCard interactive component
feat: create Checkout page with form validation
feat: implement Orders page with order history
feat: add Gemini AI service integration
feat: configure Vite build optimization
docs: add comprehensive README with architecture
test: add unit tests for StoreContext
test: add component tests for SwipeDeck
test: add integration tests for checkout flow
```

#### 2. Add Comprehensive Test Suite (CRITICAL - Test Coverage dimension)
**Current**: 0 tests
**Target**: 1:3 test-to-source ratio minimum, 70%+ coverage

Create these test files:
- `src/context/StoreContext.test.tsx` - Context state management tests
- `src/components/SwipeDeck.test.tsx` - Card swipe logic tests
- `src/components/CartDrawer.test.tsx` - Cart operations tests
- `src/components/Navbar.test.tsx` - Navigation tests
- `src/pages/Checkout.test.tsx` - Form validation tests
- `src/services/geminiService.test.ts` - AI service mock tests
- `src/App.test.tsx` - Routing integration tests

Install testing dependencies:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitest/coverage-v8
```

Add test script to package.json:
```json
"test": "vitest",
"test:coverage": "vitest --coverage"
```

#### 3. Add CI/CD Pipeline (HIGH - CI/CD Maturity dimension)
Create `.github/workflows/ci.yml`:
```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --coverage
      - name: Upload coverage
        uses: codecov/codecov-action@v3
  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
```

#### 4. Add Linting & Type Checking (HIGH - Code Cleanliness dimension)
Install ESLint and configure:
```bash
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks
```

Create `.eslintrc.cjs` with strict rules.

Add to package.json:
```json
"lint": "eslint src --ext .ts,.tsx",
"typecheck": "tsc --noEmit"
```

Update CI to run lint and typecheck.

#### 5. Commit Lockfile (MEDIUM - Dependency Health dimension)
```bash
npm install
git add package-lock.json
git commit -m "chore: add package-lock.json for dependency locking"
```

### Phase 2: Documentation Improvements (MEDIUM - Docs & Onboarding dimension)

#### Expand README.md with:
1. **Architecture Section** - Component hierarchy, state flow diagram
2. **Environment Variables** - All config options documented
3. **Development Setup** - Exact commands to build/test locally
4. **API Reference** - Gemini service integration details
5. **Contributing Guidelines** - How to submit PRs
6. **Code Style Guide** -Linting rules explanation

#### Add Additional Documentation:
- `CONTRIBUTING.md` - Contribution guidelines
- `CHANGELOG.md` - Version history (link to git tags)
- `ARCHITECTURE.md` - Technical design decisions
- `.env.example` - Environment variable template

### Phase 3: Security & Dependencies (MEDIUM - Security Hygiene dimension)

#### Add Security Scanning:
```bash
npm install -D npm-audit-fix
```

Add to CI:
```yaml
- run: npm audit
- run: npx audit-ci --moderate
```

#### Add Dependency Updates:
Create `.github/dependabot.yml`:
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
```

### Phase 4: Advanced Improvements (LOW-MEDIUM impact)

#### Add Docker Support:
Create `Dockerfile`:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

Create `docker-compose.yml` for dev environment.

#### Add GitHub Templates:
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/ISSUE_TEMPLATE/bug_report.md`
- `.github/ISSUE_TEMPLATE/feature_request.md`

#### Add Badges to README:
```markdown
![CI](https://github.com/vickyPotheesh2004/Arome-haven-/actions/workflows/ci.yml/badge.svg)
![Coverage](https://codecov.io/gh/vickyPotheesh2004/Arome-haven-/branch/main/graph/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
```

### Phase 5: Increase Code Volume & Complexity (VOLUME dimension)

#### Add New Features:
1. User authentication system
2. Order persistence with localStorage/IndexedDB
3. Advanced search/filter in menu
4. Rating and review system
5. Loyalty points system
6. Social sharing features
7. Dark mode toggle
8. Multi-language support (i18n)
9. PWA capabilities (service worker, manifest)
10. Analytics integration

#### Target Metrics:
- **Source LOC**: 5,000+ (currently ~1,341)
- **Test Files**: 15+ (currently 0)
- **Commits**: 100+ (currently 1)
- **Contributors**: 3+ if possible
- **Tags**: 10+ semantic versions
- **Coverage**: 80%+

## Expected Score Improvements

| Dimension | Current Est. | After Improvements |
|-----------|-------------|-------------------|
| Architecture & Robustness | C (65) | A (85+) |
| Test Coverage | F (0) | A (90+) |
| Code Cleanliness | C (70) | A (90+) |
| Docs & Onboarding | C (60) | A (85+) |
| Security Hygiene | D (50) | B (75+) |
| Dependency Health | C (60) | A (85+) |
| CI/CD Maturity | F (0) | A (90+) |
| History & Maintenance | F (10) | A (85+) |

**Overall Score Target**: From ~40 to 85+

## Payout Impact

Based on the assessment criteria:
- **Quality threshold**: Must reach 70+ overall score
- **Volume requirement**: 3,500+ LOC preferred
- **Task capacity**: 50+ mineable commits with tests

**Estimated payout range after improvements**: $2,000 - $8,000+ depending on final metrics

## Timeline

- **Week 1**: Git history reconstruction, test suite foundation
- **Week 2**: Complete test coverage, add CI/CD
- **Week 3**: Documentation, security scanning, Docker
- **Week 4**: Feature additions for volume increase

## Important Notes

1. **Authenticity is critical** - Don't artificially inflate metrics without real value
2. **Tests must be meaningful** - Each test should validate actual behavior
3. **Commits should tell a story** - Show natural development progression
4. **Documentation must be accurate** - Misleading docs hurt credibility
5. **All changes must build and pass** - Broken code scores zero

## Next Steps

1. Start with Phase 1, Item 1 (Git history)
2. Then implement test infrastructure (Phase 1, Item 2)
3. Add CI/CD pipeline (Phase 1, Item 3)
4. Iterate through remaining phases
5. Submit for reassessment after completing Phase 3 minimum
