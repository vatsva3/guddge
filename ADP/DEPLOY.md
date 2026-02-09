# Guddge Website Deployment Guide

## Quick Deployment Options

### Option 1: Netlify (Recommended - Free & Easiest)

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up for free account (GitHub, GitLab, or email)

2. **Deploy Your Site**
   - Drag and drop the entire project folder onto Netlify
   - Your site will be live in seconds
   - Netlify will provide a random URL (e.g., https://random-name.netlify.app)

3. **Add Custom Domain**
   - Go to "Domain Management" in Netlify dashboard
   - Click "Add custom domain"
   - Enter "guddge.com"
   - Follow DNS configuration instructions

### Option 2: Vercel (Free)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy from Project Folder**
   ```bash
   cd path/to/guddge
   vercel
   ```

3. **Follow Prompts**
   - Link to existing Vercel account or create new
   - Accept defaults for all settings
   - Your site will be deployed to a .vercel.app URL

4. **Add Custom Domain**
   ```bash
   vercel --add-domain=guddge.com
   ```

### Option 3: GitHub Pages (Free)

1. **Create GitHub Repository**
   - Go to [github.com](https://github.com)
   - Create new repository "guddge.com"

2. **Push Your Files**
   ```bash
   cd path/to/guddge
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/guddge.com.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to Repository Settings
   - Click "Pages" in left sidebar
   - Select "main" branch as source
   - Save settings

4. **Your Site URL**
   - https://yourusername.github.io/guddge.com

### Option 4: AWS S3 + CloudFront (Enterprise)

1. **Create S3 Bucket**
   - Go to AWS S3 Console
   - Create bucket "guddge.com"
   - Disable "Block all public access" settings
   - Enable static website hosting

2. **Upload Files**
   - Upload all files from project folder
   - Set all files to public-read permissions

3. **Configure CloudFront**
   - Create CloudFront distribution
   - Set origin to S3 bucket endpoint
   - Add custom domain to distribution

4. **Update DNS**
   - Point guddge.com to CloudFront distribution

### Option 5: Traditional Hosting (cPanel, Plesk, etc.)

1. **Purchase Hosting**
   - GoDaddy, Bluehost, HostGator, or similar
   - Purchase hosting plan with custom domain

2. **Upload Files**
   - Use FTP client (FileZilla, Cyberduck)
   - Or use hosting provider's file manager
   - Upload all files to public_html or www folder

3. **Point Domain**
   - Ensure domain DNS points to hosting nameservers

## Local Testing

### Run Locally Before Deployment

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000
```

**Using Node.js:**
```bash
npx serve .

# Or with specific port
npx serve . -p 3000
```

**Using PHP:**
```bash
php -S localhost:8000
```

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify chatbot works on all pages
- [ ] Test contact form functionality
- [ ] Check mobile responsiveness
- [ ] Verify all links work
- [ ] Test on different browsers
- [ ] Submit to Google Search Console (optional)

## Custom Domain Setup

### If Using Netlify:
1. Domain Management → Add custom domain
2. Update your domain registrar's DNS:
   - Add CNAME record for "www" → your-netlify-url.netlify.app
   - Add A record for "@" → Netlify load balancer IP

### If Using Vercel:
1. Project Settings → Domains → Add domain
2. Update DNS at your registrar:
   - CNAME "www" → cname.vercel-dns.com
   - A record "@" → 76.76.21.21

### If Using GitHub Pages:
1. Settings → Pages → Custom domain
2. Add DNS records:
   - A records pointing to GitHub IPs
   - CNAME for www subdomain

## SSL/HTTPS

All recommended hosting options (Netlify, Vercel, GitHub Pages) provide free automatic SSL certificates via Let's Encrypt.

## Need Help?

- **Netlify Docs:** https://docs.netlify.com
- **Vercel Docs:** https://vercel.com/docs
- **GitHub Pages:** https://docs.github.com/en/pages
