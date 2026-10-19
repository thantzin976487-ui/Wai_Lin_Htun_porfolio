WALIN HTUN — NEON PORTFOLIO WEBSITE

FILES
- index.html: page structure, original section artwork and individual project cards
- style.css: responsive dark/neon design, hover styles and AOS-style scroll reveals
- script.js: smooth navigation tracking, mobile menu, project-by-project lightbox and keyboard controls
- images/page-01.jpg, page-02.jpg, page-03.jpg, page-18.jpg, page-19.jpg: selected full-page art from the supplied PDF
- images/projects/: individual design crops made from the PDF pages

RUN IT
1. Extract the ZIP.
2. Open the extracted folder in VS Code.
3. Run index.html using Live Server (recommended).

PROJECT IMAGES
The design cards use individual cropped project images. Click one card to open only that image in the center of the screen. Close with the X, click outside the image, or press Escape. Use left/right arrow keys or the arrows to view another project.

ANIMATIONS
Scroll reveal animations are implemented locally with IntersectionObserver and data-aos attributes. Effects include fade-up/down/left/right, zoom-in/out, flip-left/right/up, blur-in, rotate-in and slide movements. Transitions are slower and replay each time an element leaves and re-enters the viewport; no external AOS CDN is required. Google Fonts are optional; system fonts remain as fallbacks.

NAVIGATION
Home, Content, About Me and Contact are in the sticky navbar. The active link changes while scrolling. Categories on the original Contents PDF page are clickable hotspots.
