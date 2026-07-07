$baseDir = "palenro-chair"
$directories = @(
    ".lovable",
    "src",
    "src/assets",
    "src/components",
    "src/components/sections",
    "src/components/ui",
    "src/hooks",
    "src/lib",
    "src/lib/api",
    "src/routes"
)

$files = @(
    "src/assets/hero.jpg",
    "src/assets/craft.jpg",
    "src/assets/collection-1.jpg",
    "src/assets/collection-2.jpg",
    "src/assets/gal-1.jpg",
    "src/assets/gal-2.jpg",
    "src/assets/gal-3.jpg",
    "src/assets/gal-4.jpg",
    "src/assets/project-1.jpg",
    "src/assets/project-2.jpg",
    "src/assets/project-3.jpg",
    "src/components/sections/Hero.tsx",
    "src/components/sections/About.tsx",
    "src/components/sections/Craft.tsx",
    "src/components/sections/Collection.tsx",
    "src/components/sections/Gallery.tsx",
    "src/components/sections/Projects.tsx",
    "src/components/sections/Contact.tsx",
    "src/components/ui/accordion.tsx",
    "src/components/ui/alert.tsx",
    "src/components/ui/alert-dialog.tsx",
    "src/components/ui/aspect-ratio.tsx",
    "src/components/ui/avatar.tsx",
    "src/components/ui/badge.tsx",
    "src/components/ui/breadcrumb.tsx",
    "src/components/ui/button.tsx",
    "src/components/ui/card.tsx",
    "src/components/ui/carousel.tsx",
    "src/components/ui/chart.tsx",
    "src/components/ui/checkbox.tsx",
    "src/components/ui/dialog.tsx",
    "src/components/ui/dropdown-menu.tsx",
    "src/components/ui/form.tsx",
    "src/components/ui/input.tsx",
    "src/components/ui/label.tsx",
    "src/components/ui/menubar.tsx",
    "src/components/ui/navigation-menu.tsx",
    "src/components/ui/pagination.tsx",
    "src/components/ui/popover.tsx",
    "src/components/ui/progress.tsx",
    "src/components/ui/radio-group.tsx",
    "src/components/ui/scroll-area.tsx",
    "src/components/ui/select.tsx",
    "src/components/ui/separator.tsx",
    "src/components/ui/sheet.tsx",
    "src/components/ui/sidebar.tsx",
    "src/components/ui/skeleton.tsx",
    "src/components/ui/slider.tsx",
    "src/components/ui/switch.tsx",
    "src/components/ui/table.tsx",
    "src/components/ui/tabs.tsx",
    "src/components/ui/textarea.tsx",
    "src/components/ui/toggle.tsx",
    "src/components/ui/toggle-group.tsx",
    "src/components/ui/tooltip.tsx",
    "src/components/Cursor.tsx",
    "src/components/Loader.tsx",
    "src/components/MagneticButton.tsx",
    "src/components/Nav.tsx",
    "src/components/PalenroLogo.tsx",
    "src/hooks/use-mobile.tsx",
    "src/lib/useLenis.ts",
    "src/lib/utils.ts",
    "src/routes/__root.tsx",
    "src/routes/index.tsx",
    "src/routeTree.gen.ts",
    "src/router.tsx",
    "src/server.ts",
    "src/start.ts",
    "src/styles.css",
    "README.md",
    "package.json",
    "components.json",
    "tsconfig.json",
    "vite.config.ts",
    "eslint.config.js",
    "bun.lock",
    "bunfig.toml",
    ".gitignore",
    ".prettierignore",
    ".prettierrc"
)

# Create base directory if it doesn't exist
if (-not (Test-Path $baseDir)) {
    New-Item -ItemType Directory -Force -Path $baseDir | Out-Null
}

# Create subdirectories
foreach ($dir in $directories) {
    $fullPath = Join-Path $baseDir $dir
    if (-not (Test-Path $fullPath)) {
        New-Item -ItemType Directory -Force -Path $fullPath | Out-Null
    }
}

# Create files
foreach ($file in $files) {
    $fullPath = Join-Path $baseDir $file
    if (-not (Test-Path $fullPath)) {
        New-Item -ItemType File -Force -Path $fullPath | Out-Null
    }
}

Write-Host "Project structure created successfully in $baseDir"
