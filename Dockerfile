# ═══════════════════════════════════════════════════════
# مرحله ۱: Builder — نصب dependency ها و build پروژه
# ═══════════════════════════════════════════════════════
FROM node:20-alpine AS builder

WORKDIR /app

# اول فقط package.json کپی می‌کنیم (برای cache بهتر)
COPY package.json package-lock.json ./
RUN npm ci

# متغیر محیطی که در build-time داخل کد می‌ره
# NEXT_PUBLIC_* ها در زمان build داخل JavaScript bundle قرار می‌گیرن
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# کپی بقیه فایل‌ها و build
COPY . .
RUN npm run build

# ═══════════════════════════════════════════════════════
# مرحله ۲: Runner — فقط فایل‌های لازم برای اجرا
# ═══════════════════════════════════════════════════════
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# فقط فایل‌هایی که برای اجرا لازمن رو کپی می‌کنیم
# (node_modules و source code لازم نیست — image کوچیک‌تر می‌شه)
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

# server.js که Next.js در standalone mode می‌سازه
CMD ["node", "server.js"]
