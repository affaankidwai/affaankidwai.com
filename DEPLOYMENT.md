# Deployment Notes

## Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Node 24.x

## Vercel

Import this repository from Vercel, then deploy using the default Next.js settings.

## Hostinger Domain

The domain `affaankidwai.com` is owned through Hostinger. Add both domains to the Vercel project after deployment:

```bash
affaankidwai.com
www.affaankidwai.com
```

Then update DNS in Hostinger:

- Apex/root `affaankidwai.com`: `A` record pointing to `76.76.21.21`
- `www.affaankidwai.com`: `CNAME` pointing to `cname.vercel-dns.com`

Vercel may show project-specific DNS instructions after the domain is added; use those values if they differ.
