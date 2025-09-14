// components.js
export const uiComponents = {
    Navbar: `
        <div class="preview-nav p-4 rounded-lg flex justify-between items-center smooth-transition">
            <span class="font-bold text-lg">Logo</span>
            <div class="flex space-x-4"><span>Home</span><span>About</span><span>Contact</span></div>
        </div>`,
    
    Buttons: `
        <div class="flex flex-wrap gap-4">
            <button class="preview-button-primary font-semibold py-2 px-4 rounded-lg smooth-transition">Primary</button>
            <button class="preview-button-secondary font-semibold py-2 px-4 rounded-lg smooth-transition">Secondary</button>
            <button class="preview-button-ghost font-semibold py-2 px-4 rounded-lg smooth-transition">Ghost</button>
        </div>`,
    
    Card: `
        <div class="preview-card border rounded-lg overflow-hidden smooth-transition">
            <div class="p-4">
               <h3 class="preview-card-header text-xl font-bold mb-2">Card Title</h3>
               <p class="preview-card-body">This is a sample card component to demonstrate the color palette application.</p>
            </div>
            <div class="px-4 py-3 bg-opacity-50" style="background-color: var(--c4_alpha)">
               <button class="preview-button-primary font-semibold py-1 px-3 text-sm rounded-md smooth-transition">Action</button>
            </div>
        </div>`,
    
    Forms: `
        <div class="space-y-4">
            <div>
                <label class="text-sm font-medium text-secondary block mb-1">Email Address</label>
                <input type="email" placeholder="you@example.com" class="preview-input w-full p-2 border rounded-md smooth-transition">
            </div>
            <div>
                <label class="text-sm font-medium text-secondary block mb-1">Password</label>
                <input type="password" placeholder="••••••••" class="preview-input w-full p-2 border rounded-md smooth-transition">
            </div>
        </div>`,
    
    Alerts: `
        <div class="preview-alert border-l-4 p-4 rounded-md smooth-transition" role="alert">
            <p class="font-bold">Alert!</p>
            <p>This is an important message.</p>
        </div>`,
    
    Modals: `
        <div class="preview-modal-content rounded-lg overflow-hidden border border-color">
            <div class="preview-modal-header p-4 flex justify-between items-center">
                <h3 class="font-bold text-lg">Modal Title</h3>
                <button class="text-2xl">&times;</button>
            </div>
            <div class="p-4"><p class="text-secondary">This is the modal body content. It can contain forms, text, or other elements.</p></div>
            <div class="px-4 py-3 flex justify-end space-x-2" style="background-color: var(--c4_alpha)">
                <button class="preview-button-secondary font-semibold py-1 px-3 text-sm rounded-md smooth-transition">Close</button>
                <button class="preview-button-primary font-semibold py-1 px-3 text-sm rounded-md smooth-transition">Save</button>
            </div>
        </div>`,
    
    Table: `
        <div class="preview-table border rounded-lg overflow-hidden">
            <table class="w-full">
                <thead class="bg-opacity-10" style="background-color: var(--c3_alpha)">
                    <tr>
                        <th class="p-3 text-left font-semibold">Name</th>
                        <th class="p-3 text-left font-semibold">Email</th>
                        <th class="p-3 text-left font-semibold">Status</th>
                        <th class="p-3 text-left font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-t">
                        <td class="p-3">John Doe</td>
                        <td class="p-3">john@example.com</td>
                        <td class="p-3"><span class="px-2 py-1 rounded-full text-xs font-medium" style="background-color: var(--c2_alpha); color: var(--c2)">Active</span></td>
                        <td class="p-3"><button class="preview-button-primary text-xs py-1 px-2 rounded">Edit</button></td>
                    </tr>
                </tbody>
            </table>
        </div>`,
    
    Pagination: `
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
                <button class="preview-button-secondary p-2 rounded-md">Previous</button>
                <button class="preview-button-primary p-2 rounded-md">1</button>
                <button class="preview-button-secondary p-2 rounded-md">2</button>
                <button class="preview-button-secondary p-2 rounded-md">3</button>
                <button class="preview-button-secondary p-2 rounded-md">Next</button>
            </div>
        </div>`,
    
    Tabs: `
        <div class="preview-tabs">
            <div class="flex border-b">
                <button class="preview-tab-active px-4 py-2 font-medium border-b-2">Overview</button>
                <button class="preview-tab px-4 py-2 font-medium">Analytics</button>
                <button class="preview-tab px-4 py-2 font-medium">Settings</button>
            </div>
            <div class="p-4">
                <p class="text-secondary">Tab content goes here.</p>
            </div>
        </div>`,
    
    Badge: `
        <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 rounded-full text-xs font-medium" style="background-color: var(--c1_alpha); color: var(--c1)">Default</span>
            <span class="px-2 py-1 rounded-full text-xs font-medium" style="background-color: var(--c2_alpha); color: var(--c2)">Success</span>
            <span class="px-2 py-1 rounded-full text-xs font-medium" style="background-color: var(--c3_alpha); color: var(--c3)">Warning</span>
            <span class="px-2 py-1 rounded-full text-xs font-medium" style="background-color: var(--c4_alpha); color: var(--c4)">Error</span>
        </div>`,
    
    // OLD TOOLTIP COMPONENT REMOVED - Replaced with modern popup card system
    
    Dropdown: `
        <div class="relative inline-block">
            <button class="preview-button-secondary px-4 py-2 rounded-md flex items-center">
                Options
                <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <div class="absolute top-full left-0 mt-1 w-48 rounded-md shadow-lg border border-color">
                <div class="py-1">
                    <a href="#" class="block px-4 py-2 text-sm">Option 1</a>
                    <a href="#" class="block px-4 py-2 text-sm">Option 2</a>
                    <a href="#" class="block px-4 py-2 text-sm">Option 3</a>
                </div>
            </div>
        </div>`,
    
    Avatar: `
        <div class="flex items-center space-x-4">
            <div class="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white" style="background-color: var(--c1)">JD</div>
            <div>
                <p class="font-medium">John Doe</p>
                <p class="text-sm text-secondary">john@example.com</p>
            </div>
        </div>`,
    
    Progress: `
        <div class="space-y-2">
            <div class="flex justify-between text-sm">
                <span>Progress</span>
                <span>75%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="h-2 rounded-full smooth-transition" style="background-color: var(--c1); width: 75%"></div>
            </div>
        </div>`,
    
    Stepper: `
        <div class="flex items-center">
            <div class="flex items-center">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-white" style="background-color: var(--c1)">1</div>
                <div class="ml-2 text-sm font-medium">Step 1</div>
            </div>
            <div class="flex-1 h-0.5 mx-4" style="background-color: var(--c3)"></div>
            <div class="flex items-center">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2" style="border-color: var(--c3)">2</div>
                <div class="ml-2 text-sm font-medium">Step 2</div>
            </div>
        </div>`,
    
    Sidebar: `
        <div class="flex h-32">
            <div class="w-48 border-r border-color">
                <div class="p-4">
                    <h3 class="font-bold mb-4">Navigation</h3>
                    <div class="space-y-2">
                        <div class="p-2 rounded-md" style="background-color: var(--c1_alpha)">Dashboard</div>
                        <div class="p-2 rounded-md">Analytics</div>
                        <div class="p-2 rounded-md">Settings</div>
                    </div>
                </div>
            </div>
            <div class="flex-1 p-4">
                <p class="text-secondary">Main content area</p>
            </div>
        </div>`,
    
    Footer: `
        <footer class="w-full py-6 border-t mt-8" style="background-color: var(--c4); border-color: var(--c2); color: var(--c1);">
            <div class="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <span class="text-sm">&copy; 2024 Palettinum. All rights reserved.</span>
                <div class="flex space-x-4 mt-2 md:mt-0">
                    <a href="#" class="hover:underline" style="color: var(--c2);">Privacy Policy</a>
                    <a href="#" class="hover:underline" style="color: var(--c2);">Terms</a>
                </div>
            </div>
        </footer>`,
    
    Breadcrumbs: `
        <nav class="flex items-center space-x-2 text-sm" aria-label="Breadcrumb" style="color: var(--c2);">
            <a href="#" class="hover:underline" style="color: var(--c2);">Home</a>
            <span>/</span>
            <a href="#" class="hover:underline" style="color: var(--c3);">Library</a>
            <span>/</span>
            <span style="color: var(--c1);">Data</span>
        </nav>`,
    
    Accordion: `
        <div class="space-y-2">
            <div class="border rounded-md" style="border-color: var(--c3);">
                <button class="w-full p-4 text-left font-medium flex justify-between items-center" style="color: var(--c2);">
                    <span>Section 1</span>
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: var(--c2);">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div class="px-4 pb-4">
                    <p class="text-secondary">Accordion content goes here.</p>
                </div>
            </div>
        </div>`,
    
    Switch: `
        <div class="flex items-center space-x-3">
            <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only" checked>
                <div class="w-11 h-6 rounded-full" style="background-color: var(--c1)">
                    <div class="w-5 h-5 bg-white rounded-full shadow transform translate-x-5"></div>
                </div>
            </label>
            <span class="text-sm font-medium">Toggle Switch</span>
        </div>`,
    
    Slider: `
        <div class="space-y-2">
            <label class="text-sm font-medium">Range Slider</label>
            <input type="range" min="0" max="100" value="50" class="w-full h-2 rounded-lg appearance-none cursor-pointer" style="background: linear-gradient(to right, var(--c1) 0%, var(--c1) 50%, #e5e7eb 50%, #e5e7eb 100%);">
        </div>`,
    
    Notification: `
        <div class="p-4 rounded-lg border-l-4" style="background-color: var(--c2_alpha); border-left-color: var(--c2)">
            <div class="flex">
                <div class="flex-shrink-0">
                    <svg class="h-5 w-5" style="color: var(--c2)" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                </div>
                <div class="ml-3">
                    <p class="text-sm font-medium" style="color: var(--c2)">Success notification</p>
                    <p class="text-sm text-secondary">Your action was completed successfully.</p>
                </div>
            </div>
        </div>`,
    
    EmptyState: `
        <div class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-primary">No items found</h3>
            <p class="mt-1 text-sm text-secondary">Get started by creating a new item.</p>
            <div class="mt-6">
                <button class="preview-button-primary px-4 py-2 rounded-md">Create Item</button>
            </div>
        </div>`,
    
    Search: `
        <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </div>
            <input type="text" placeholder="Search..." class="preview-input w-full pl-10 pr-4 py-2 border rounded-lg">
        </div>`,
    
    Menu: `
        <div class="relative inline-block">
            <button class="preview-button-secondary px-4 py-2 rounded-md flex items-center">
                Menu
                <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
            <div class="absolute top-full left-0 mt-1 w-48 rounded-md shadow-lg border border-color">
                <div class="py-1">
                    <a href="#" class="block px-4 py-2 text-sm">Profile</a>
                    <a href="#" class="block px-4 py-2 text-sm">Settings</a>
                    <a href="#" class="block px-4 py-2 text-sm">Sign out</a>
                </div>
            </div>
        </div>`,
    
    Stats: `
        <div class="grid grid-cols-3 gap-4">
            <div class="p-4 rounded-lg border border-color">
                <div class="text-2xl font-bold" style="color: var(--c1)">1,234</div>
                <div class="text-sm text-secondary">Total Users</div>
            </div>
            <div class="p-4 rounded-lg border border-color">
                <div class="text-2xl font-bold" style="color: var(--c2)">567</div>
                <div class="text-sm text-secondary">Active Users</div>
            </div>
            <div class="p-4 rounded-lg border border-color">
                <div class="text-2xl font-bold" style="color: var(--c3)">89%</div>
                <div class="text-sm text-secondary">Conversion Rate</div>
            </div>
        </div>`,
    
    Timeline: `
        <div class="space-y-4">
            <div class="flex items-start space-x-4">
                <div class="w-3 h-3 rounded-full mt-2" style="background-color: var(--c1)"></div>
                <div class="flex-1">
                    <h4 class="font-semibold">Project Started</h4>
                    <p class="text-sm text-secondary">Initial planning and setup</p>
                    <span class="text-xs text-secondary">2 days ago</span>
                </div>
            </div>
            <div class="flex items-start space-x-4">
                <div class="w-3 h-3 rounded-full mt-2" style="background-color: var(--c2)"></div>
                <div class="flex-1">
                    <h4 class="font-semibold">Design Phase</h4>
                    <p class="text-sm text-secondary">UI/UX design completed</p>
                    <span class="text-xs text-secondary">1 day ago</span>
                </div>
            </div>
        </div>`,

    Progress: `
        <div class="space-y-4">
            <div>
                <div class="flex justify-between items-center mb-2">
                    <span class="text-sm font-medium">Upload Progress</span>
                    <span class="text-sm text-secondary">75%</span>
                </div>
                <div class="w-full h-2 bg-secondary rounded-full">
                    <div class="h-2 rounded-full" style="background-color: var(--c1); width: 75%"></div>
                </div>
            </div>
        </div>`,

    Notification: `
        <div class="p-4 border border-color rounded-lg shadow-sm">
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    <svg class="h-6 w-6" style="color: var(--c1)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <div class="ml-3 flex-1">
                    <p class="text-sm font-medium">Success!</p>
                    <p class="text-sm text-secondary mt-1">Your changes have been saved successfully.</p>
                </div>
            </div>
        </div>`,

    EmptyState: `
        <div class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-secondary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
            </svg>
            <h3 class="text-lg font-semibold mb-2">No items found</h3>
            <p class="text-secondary mb-4">Get started by creating your first item.</p>
            <button class="preview-button-primary px-4 py-2 rounded">Create Item</button>
        </div>`,
    Calendar: `
        <div class="border border-color rounded-lg p-4">
            <div class="flex items-center justify-between mb-4">
                <h3 class="font-semibold">December 2024</h3>
                <div class="flex space-x-2">
                    <button class="p-1 rounded">&lt;</button>
                    <button class="p-1 rounded">&gt;</button>
                </div>
            </div>
            <div class="grid grid-cols-7 gap-1 text-center text-sm">
                <div class="p-2 text-secondary">Su</div>
                <div class="p-2 text-secondary">Mo</div>
                <div class="p-2 text-secondary">Tu</div>
                <div class="p-2 text-secondary">We</div>
                <div class="p-2 text-secondary">Th</div>
                <div class="p-2 text-secondary">Fr</div>
                <div class="p-2 text-secondary">Sa</div>
                <div class="p-2">1</div>
                <div class="p-2">2</div>
                <div class="p-2">3</div>
                <div class="p-2 rounded" style="background-color: var(--c1_alpha); color: var(--c1)">4</div>
                <div class="p-2">5</div>
                <div class="p-2">6</div>
                <div class="p-2">7</div>
            </div>
        </div>`,

    KanbanBoard: `
        <div class="flex space-x-4 overflow-x-auto">
            <div class="w-56 bg-secondary border rounded-lg p-3" style="background-color: var(--c5); border-color: var(--c2);">
                <h4 class="font-semibold mb-2" style="color: var(--c1);">To Do</h4>
                <div class="space-y-2">
                    <div class="rounded p-2" style="background-color: var(--c3); color: var(--c5);">Task 1</div>
                    <div class="rounded p-2" style="background-color: var(--c4); color: var(--c1);">Task 2</div>
                </div>
            </div>
            <div class="w-56 bg-secondary border rounded-lg p-3" style="background-color: var(--c5); border-color: var(--c2);">
                <h4 class="font-semibold mb-2" style="color: var(--c1);">In Progress</h4>
                <div class="space-y-2">
                    <div class="rounded p-2" style="background-color: var(--c2); color: var(--c5);">Task 3</div>
                </div>
            </div>
            <div class="w-56 bg-secondary border rounded-lg p-3" style="background-color: var(--c5); border-color: var(--c2);">
                <h4 class="font-semibold mb-2" style="color: var(--c1);">Done</h4>
                <div class="space-y-2">
                    <div class="rounded p-2" style="background-color: var(--c3); color: var(--c5);">Task 4</div>
                </div>
            </div>
        </div>`,

    FileUploader: `
        <div class="border-2 border-dashed border-color rounded-lg p-6 text-center">
            <svg class="mx-auto h-10 w-10 text-secondary mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
            </svg>
            <p class="text-primary font-medium mb-1">Upload a file</p>
            <p class="text-secondary text-xs mb-3">or drag and drop</p>
            <button class="preview-button-primary px-4 py-2 rounded-md">Browse</button>
        </div>`,

    Chip: `
        <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-medium bg-opacity-80" style="background-color: var(--c2_alpha); color: var(--c2)">Chip One</span>
            <span class="px-3 py-1 rounded-full text-xs font-medium bg-opacity-80" style="background-color: var(--c3_alpha); color: var(--c3)">Chip Two</span>
            <span class="px-3 py-1 rounded-full text-xs font-medium bg-opacity-80" style="background-color: var(--c4_alpha); color: var(--c4)">Chip Three</span>
        </div>`,

    ListGroup: `
        <ul class="border rounded-lg divide-y smooth-transition" style="border-color: var(--c3);">
            <li class="p-3" style="background-color: var(--c5); color: var(--c1);">List Item 1</li>
            <li class="p-3" style="background-color: var(--c5); color: var(--c1);">List Item 2</li>
            <li class="p-3" style="background-color: var(--c5); color: var(--c1);">List Item 3</li>
        </ul>`,

    MediaObject: `
        <div class="flex items-center space-x-4">
            <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background-color: var(--c2); color: var(--c5);">
                <svg class="w-8 h-8" fill="currentColor" style="color: var(--c1);" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path>
                </svg>
            </div>
            <div class="flex-1 min-w-0">
                <h4 class="font-semibold" style="color: var(--c1);">Media Title</h4>
                <p class="text-sm text-secondary">This is a description of the media object with supporting text.</p>
                <div class="mt-2 flex space-x-2">
                    <button class="preview-button-primary text-xs px-2 py-1 rounded">View</button>
                    <button class="preview-button-secondary text-xs px-2 py-1 rounded">Download</button>
                </div>
            </div>
        </div>`,

    PricingTable: `
        <div class="grid grid-cols-3 gap-4">
            <div class="border border-color rounded-lg p-6 text-center">
                <h4 class="font-bold text-lg mb-2">Basic</h4>
                <div class="text-2xl font-bold mb-2">$9</div>
                <ul class="text-sm text-secondary mb-4">
                    <li>1 User</li><li>5GB Storage</li><li>Email Support</li>
                </ul>
                <button class="preview-button-primary px-4 py-2 rounded-md">Choose</button>
            </div>
            <div class="border-2 border-accent rounded-lg p-6 text-center">
                <h4 class="font-bold text-lg mb-2">Pro</h4>
                <div class="text-2xl font-bold mb-2">$29</div>
                <ul class="text-sm text-secondary mb-4">
                    <li>10 Users</li><li>50GB Storage</li><li>Priority Support</li>
                </ul>
                <button class="preview-button-primary px-4 py-2 rounded-md">Choose</button>
            </div>
            <div class="border border-color rounded-lg p-6 text-center">
                <h4 class="font-bold text-lg mb-2">Enterprise</h4>
                <div class="text-2xl font-bold mb-2">$99</div>
                <ul class="text-sm text-secondary mb-4">
                    <li>Unlimited Users</li><li>1TB Storage</li><li>24/7 Support</li>
                </ul>
                <button class="preview-button-primary px-4 py-2 rounded-md">Choose</button>
            </div>
        </div>`,

    Callout: `
        <div class="p-4 border-l-4 rounded-r-lg" style="border-left-color: var(--c1); background-color: var(--c1_alpha)">
            <div class="flex">
                <div class="flex-shrink-0">
                    <svg class="h-5 w-5" style="color: var(--c1)" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                    </svg>
                </div>
                <div class="ml-3">
                    <h3 class="text-sm font-medium" style="color: var(--c1)">Information</h3>
                    <div class="mt-2 text-sm">
                        <p>This is an informational callout with important details.</p>
                    </div>
                </div>
            </div>
        </div>`,



    Toast: `
        <div class="relative p-4 border rounded-lg shadow-lg max-w-sm" style="background-color: var(--c4); border-color: var(--c2); color: var(--c1);">
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" style="color: var(--c2);" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                </div>
                <div class="ml-3 flex-1">
                    <p class="font-medium">Warning</p>
                    <p class="text-sm text-secondary mt-1">Please check your input and try again.</p>
                </div>
            </div>
        </div>`,

    AppBar: `
        <div class="relative min-h-[80px] bg-secondary border border-dashed border-color rounded-lg p-4 flex items-center justify-between">
            <div class="font-bold text-lg">App Bar</div>
            <div class="flex items-center space-x-2">
                <button class="preview-button-secondary px-3 py-1 rounded-md">Action 1</button>
                <button class="preview-button-primary px-3 py-1 rounded-md">Action 2</button>
            </div>
        </div>`,

    Drawer: `
        <div class="relative min-h-[180px] border border-dashed rounded-lg p-4 flex items-start justify-start" style="background-color: var(--c5); border-color: var(--c2); overflow:visible;">
            <div class="absolute top-4 left-4 w-64 border p-6 rounded-lg shadow z-10" style="background-color: var(--c4); border-color: var(--c2);">
                <h3 class="font-bold mb-4" style="color: var(--c1);">Drawer Title</h3>
                <ul class="space-y-2">
                    <li><a href="#" class="block p-2 rounded" style="color: var(--c2);">Menu Item 1</a></li>
                    <li><a href="#" class="block p-2 rounded" style="color: var(--c2);">Menu Item 2</a></li>
                    <li><a href="#" class="block p-2 rounded" style="color: var(--c2);">Menu Item 3</a></li>
                </ul>
            </div>
        </div>`,

    KanbanBoard: `
        <div class="flex space-x-4 overflow-x-auto">
            <div class="w-56 bg-secondary border rounded-lg p-3" style="background-color: var(--c5); border-color: var(--c2);">
                <h4 class="font-semibold mb-2" style="color: var(--c1);">To Do</h4>
                <div class="space-y-2">
                    <div class="rounded p-2" style="background-color: var(--c3); color: var(--c5);">Task 1</div>
                    <div class="rounded p-2" style="background-color: var(--c4); color: var(--c1);">Task 2</div>
                </div>
            </div>
            <div class="w-56 bg-secondary border rounded-lg p-3" style="background-color: var(--c5); border-color: var(--c2);">
                <h4 class="font-semibold mb-2" style="color: var(--c1);">In Progress</h4>
                <div class="space-y-2">
                    <div class="rounded p-2" style="background-color: var(--c2); color: var(--c5);">Task 3</div>
                </div>
            </div>
            <div class="w-56 bg-secondary border rounded-lg p-3" style="background-color: var(--c5); border-color: var(--c2);">
                <h4 class="font-semibold mb-2" style="color: var(--c1);">Done</h4>
                <div class="space-y-2">
                    <div class="rounded p-2" style="background-color: var(--c3); color: var(--c5);">Task 4</div>
                </div>
            </div>
        </div>`,

    ChatBubble: `
        <div class="flex flex-col space-y-2 max-w-xs">
            <div class="self-end bg-accent text-white rounded-lg px-4 py-2" style="background-color: var(--c2); color: var(--c5);">Hi, how can I help you?</div>
            <div class="self-start bg-secondary text-primary rounded-lg px-4 py-2" style="background-color: var(--c3); color: var(--c1);">I have a question about my palette.</div>
        </div>`,

    AvatarGroup: `
        <div class="flex -space-x-2">
            <div class="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold" style="background-color: var(--c2); color: var(--c5); border-color: var(--c4);">AB</div>
            <div class="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold" style="background-color: var(--c3); color: var(--c1); border-color: var(--c4);">CD</div>
            <div class="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold" style="background-color: var(--c4); color: var(--c1); border-color: var(--c2);">EF</div>
        </div>`,

    Divider: `
        <div class="w-full border-t my-4" style="border-color: var(--c3);"></div>`,

    Collapse: `
        <div class="border rounded-md" style="border-color: var(--c3);">
            <button class="w-full p-4 text-left font-medium flex justify-between items-center" style="color: var(--c2);">
                <span>Collapse Section</span>
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: var(--c2);">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <div class="px-4 pb-4">
                <p class="text-secondary">Collapse content goes here.</p>
            </div>
        </div>`,

    Carousel: `
        <div class="relative w-full max-w-md mx-auto">
            <div class="rounded-lg overflow-hidden border" style="border-color: var(--c2);">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNhcm91c2VsIFNsaWRlPC90ZXh0Pjwvc3ZnPg==" class="w-full h-48 object-cover" alt="Carousel Slide">
            </div>
            <div class="flex justify-center mt-2 space-x-2">
                <button class="w-3 h-3 rounded-full" style="background-color: var(--c2);"></button>
                <button class="w-3 h-3 rounded-full bg-secondary border border-color"></button>
                <button class="w-3 h-3 rounded-full bg-secondary border border-color"></button>
            </div>
        </div>`,

    RatingStars: `
        <div class="flex items-center space-x-1">
            <svg class="w-5 h-5" fill="currentColor" style="color: var(--c2);" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.175 0l-3.386 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"/></svg>
            <svg class="w-5 h-5" fill="currentColor" style="color: var(--c2);" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.175 0l-3.386 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"/></svg>
            <svg class="w-5 h-5" fill="currentColor" style="color: var(--c2);" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.175 0l-3.386 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"/></svg>
            <svg class="w-5 h-5" fill="currentColor" style="color: var(--c3);" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.175 0l-3.386 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"/></svg>
            <svg class="w-5 h-5" fill="currentColor" style="color: var(--c3);" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.175 0l-3.386 2.46c-.784.57-1.838-.196-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"/></svg>
        </div>`,

    CodeBlock: `
        <div class="rounded-lg border p-4 overflow-x-auto text-xs font-mono" style="background-color: var(--c5); border-color: var(--c3); color: var(--c1);"><code>// Example code block\nfunction helloWorld() {\n  console.log('Hello, world!');\n}</code></div>`,

    ImageGallery: `
        <div class="grid grid-cols-3 gap-2">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIDE8L3RleHQ+PC9zdmc+" class="rounded-lg border object-cover w-full h-24" style="border-color: var(--c2);" alt="Gallery Image 1">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIDI8L3RleHQ+PC9zdmc+" class="rounded-lg border object-cover w-full h-24" style="border-color: var(--c3);" alt="Gallery Image 2">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIDM8L3RleHQ+PC9zdmc+" class="rounded-lg border object-cover w-full h-24" style="border-color: var(--c4);" alt="Gallery Image 3">
        </div>`,

    VideoPlayer: `
        <div class="rounded-lg overflow-hidden border" style="border-color: var(--c2);">
            <video controls class="w-full h-40" poster="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIFZpZGVvPC90ZXh0Pjwvc3ZnPg==">
                <source src="data:video/mp4;base64," type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>`,

    StepProgressBar: `
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style="background-color: var(--c1)">1</div>
                <div class="w-12 h-1 mx-2" style="background-color: var(--c1)"></div>
            </div>
            <div class="flex items-center">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style="background-color: var(--c2)">2</div>
                <div class="w-12 h-1 mx-2 bg-secondary"></div>
            </div>
            <div class="flex items-center">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-secondary text-sm font-bold border-2 border-secondary">3</div>
            </div>
        </div>`,

    InputGroup: `
        <div class="flex rounded-md shadow-sm">
            <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-color bg-secondary text-secondary text-sm">$</span>
            <input type="text" class="preview-input w-full border border-color rounded-none rounded-r-md" placeholder="Amount">
        </div>`
,
    NumberInput: `
        <div class="flex items-center space-x-2">
            <button class="preview-button-secondary px-2 py-1 rounded">-</button>
            <input type="number" class="preview-input w-16 text-center border rounded" value="1">
            <button class="preview-button-secondary px-2 py-1 rounded">+</button>
        </div>`
,
    ColorPicker: `
        <div class="flex items-center space-x-2">
            <input type="color" class="w-10 h-10 rounded" style="border-color: var(--c2);">
            <span class="text-sm font-medium" style="color: var(--c1);">Pick a color</span>
        </div>`
,
    DataTable: `
        <div class="border border-color rounded-lg overflow-hidden">
            <div class="p-4 border-b border-color">
                <h3 class="font-bold text-lg">Data Table</h3>
            </div>
            <table class="w-full">
                <thead class="bg-opacity-10" style="background-color: var(--c3_alpha)">
                    <tr>
                        <th class="p-3 text-left font-semibold">ID</th>
                        <th class="p-3 text-left font-semibold">Name</th>
                        <th class="p-3 text-left font-semibold">Status</th>
                        <th class="p-3 text-left font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b border-color">
                        <td class="p-3">#001</td>
                        <td class="p-3">John Doe</td>
                        <td class="p-3"><span class="px-2 py-1 rounded-full text-xs font-medium" style="background-color: var(--c2_alpha); color: var(--c2)">Active</span></td>
                        <td class="p-3">
                            <button class="text-white bg-red-500 rounded px-2 py-1 text-xs">×</button>
                            <button class="text-white bg-red-500 rounded px-2 py-1 text-xs">×</button>
                        </td>
                    </tr>
                    <tr class="border-b border-color">
                        <td class="p-3">#002</td>
                        <td class="p-3">Jane Smith</td>
                        <td class="p-3"><span class="px-2 py-1 rounded-full text-xs font-medium" style="background-color: var(--c3_alpha); color: var(--c3)">Pending</span></td>
                        <td class="p-3">
                            <button class="text-white bg-red-500 rounded px-2 py-1 text-xs">×</button>
                            <button class="text-white bg-red-500 rounded px-2 py-1 text-xs">×</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>`,
    MultiSelect: `
        <div class="relative">
            <div class="border rounded-md p-2 min-h-10 flex flex-wrap gap-1" style="border-color: var(--c3);">
                <span class="px-2 py-1 rounded-full text-xs font-medium flex items-center" style="background-color: var(--c2); color: var(--c5);">
                    Option 1
                    <button class="ml-1 text-white">×</button>
                </span>
                <span class="px-2 py-1 rounded-full text-xs font-medium flex items-center" style="background-color: var(--c3); color: var(--c5);">
                    Option 2
                    <button class="ml-1 text-white">×</button>
                </span>
                <input type="text" placeholder="Add option..." class="flex-1 min-w-0 border-none outline-none bg-transparent">
            </div>
        </div>`
,
    DateRangePicker: `
        <div class="flex items-center space-x-2">
            <div class="relative">
                <input type="date" class="preview-input px-3 py-2 border rounded-md">
            </div>
            <span class="text-secondary">to</span>
            <div class="relative">
                <input type="date" class="preview-input px-3 py-2 border rounded-md">
            </div>
            <button class="preview-button-primary px-3 py-2 rounded-md text-sm">Apply</button>
        </div>`
,
    RichTextEditor: `
        <div class="border rounded-lg overflow-hidden" style="border-color: var(--c3);">
            <div class="p-2 border-b flex space-x-1" style="border-color: var(--c2); background-color: var(--c4);">
                <button class="p-1 rounded" title="Bold" style="color: var(--c2);">B</button>
                <button class="p-1 rounded" title="Italic" style="color: var(--c2);">I</button>
                <button class="p-1 rounded" title="Underline" style="color: var(--c2);">U</button>
                <div class="w-px mx-2" style="background-color: var(--c3);"></div>
                <button class="p-1 rounded" title="List" style="color: var(--c2);">•</button>
                <button class="p-1 rounded" title="Numbered List" style="color: var(--c2);">1.</button>
            </div>
            <div class="p-4 min-h-32" style="background-color: var(--c5); color: var(--c1);">
                <p class="text-secondary">Start typing your content here...</p>
            </div>
        </div>`,

    FileTree: `
        <div class="border rounded-lg p-3" style="border-color: var(--c3); background-color: var(--c5);">
            <ul class="space-y-1">
                <li class="flex items-center space-x-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" style="color: var(--c2);" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v4a1 1 0 001 1h3m10-5h2a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h2"></path></svg>
                    <span style="color: var(--c1);">src</span>
                </li>
                <li class="flex items-center space-x-2 ml-4">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" style="color: var(--c3);" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v16c0 1.1.9 2 2 2h12a2 2 0 002-2V4"></path></svg>
                    <span style="color: var(--c1);">components</span>
                </li>
                <li class="flex items-center space-x-2 ml-8">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" style="color: var(--c4);" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h16v16H4z"></path></svg>
                    <span style="color: var(--c1);">Button.js</span>
                </li>
            </ul>
        </div>`,

    GanttChart: `
        <div class="space-y-2">
            <div class="flex items-center space-x-4">
                <span class="text-sm font-medium w-20">Task 1</span>
                <div class="flex-1 h-4 bg-secondary rounded-full relative">
                    <div class="h-4 rounded-full" style="background-color: var(--c1); width: 60%; position: absolute; left: 20%"></div>
                </div>
                <span class="text-xs text-secondary">60%</span>
            </div>
            <div class="flex items-center space-x-4">
                <span class="text-sm font-medium w-20">Task 2</span>
                <div class="flex-1 h-4 bg-secondary rounded-full relative">
                    <div class="h-4 rounded-full" style="background-color: var(--c2); width: 30%; position: absolute; left: 0%"></div>
                </div>
                <span class="text-xs text-secondary">30%</span>
            </div>
        </div>`,

    Heatmap: `
        <div class="grid grid-cols-7 gap-1">
            <div class="w-6 h-6 rounded-sm" style="background-color: var(--c1_alpha)"></div>
            <div class="w-6 h-6 rounded-sm" style="background-color: var(--c2_alpha)"></div>
            <div class="w-6 h-6 rounded-sm" style="background-color: var(--c3_alpha)"></div>
            <div class="w-6 h-6 rounded-sm" style="background-color: var(--c4_alpha)"></div>
            <div class="w-6 h-6 rounded-sm" style="background-color: var(--c1_alpha)"></div>
            <div class="w-6 h-6 rounded-sm" style="background-color: var(--c2_alpha)"></div>
            <div class="w-6 h-6 rounded-sm" style="background-color: var(--c3_alpha)"></div>
        </div>`,

    Dashboard: `
        <div class="grid grid-cols-2 gap-4">
            <div class="p-4 border border-color rounded-lg">
                <h4 class="font-semibold mb-2">Revenue</h4>
                <div class="text-2xl font-bold" style="color: var(--c1)">$12,345</div>
                <div class="text-sm text-secondary">+12% from last month</div>
            </div>
            <div class="p-4 border border-color rounded-lg">
                <h4 class="font-semibold mb-2">Users</h4>
                <div class="text-2xl font-bold" style="color: var(--c2)">1,234</div>
                <div class="text-sm text-secondary">+8% from last month</div>
            </div>
        </div>`,

    Analytics: `
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <h4 class="font-semibold">Traffic Sources</h4>
                <span class="text-sm text-secondary">Last 30 days</span>
            </div>
            <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <span class="text-sm">Direct</span>
                    <div class="flex items-center space-x-2">
                        <div class="w-24 h-2 bg-secondary rounded-full">
                            <div class="h-2 rounded-full" style="background-color: var(--c1); width: 45%"></div>
                        </div>
                        <span class="text-sm font-medium">45%</span>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-sm">Organic</span>
                    <div class="flex items-center space-x-2">
                        <div class="w-24 h-2 bg-secondary rounded-full">
                            <div class="h-2 rounded-full" style="background-color: var(--c2); width: 30%"></div>
                        </div>
                        <span class="text-sm font-medium">30%</span>
                    </div>
                </div>
            </div>
        </div>`,

    Stats: `
        <div class="grid grid-cols-3 gap-4">
            <div class="text-center p-4 border border-color rounded-lg">
                <div class="text-2xl font-bold" style="color: var(--c1)">2.4K</div>
                <div class="text-sm text-secondary">Total Users</div>
            </div>
            <div class="text-center p-4 border border-color rounded-lg">
                <div class="text-2xl font-bold" style="color: var(--c2)">89%</div>
                <div class="text-sm text-secondary">Satisfaction</div>
            </div>
            <div class="text-center p-4 border border-color rounded-lg">
                <div class="text-2xl font-bold" style="color: var(--c3)">12.5K</div>
                <div class="text-sm text-secondary">Revenue</div>
            </div>
        </div>`,
    Onboarding: `
        <div class="text-center p-6 border border-color rounded-lg">
            <div class="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2">Welcome to Paletteniffer!</h3>
            <p class="text-secondary mb-4">Let's get you started with creating your first color palette.</p>
            <div class="flex justify-center space-x-2">
                <button class="preview-button-primary px-4 py-2 rounded">Get Started</button>
                <button class="preview-button-secondary px-4 py-2 rounded">Skip Tutorial</button>
            </div>
        </div>`
,
    Feedback: `
        <div class="relative bg-secondary border border-dashed border-color rounded-lg p-4 max-w-md mx-auto">
            <div class="space-y-4">
                <div class="flex items-center space-x-4">
                    <span class="text-sm font-medium">How was your experience?</span>
                    <div class="flex space-x-1">
                        <button class="w-8 h-8 rounded-full border border-color">😞</button>
                        <button class="w-8 h-8 rounded-full border border-color">😐</button>
                        <button class="w-8 h-8 rounded-full border border-color">😊</button>
                        <button class="w-8 h-8 rounded-full border border-color">😍</button>
                    </div>
                </div>
                <textarea class="preview-input w-full p-3 border rounded-md" placeholder="Tell us more (optional)..." rows="3"></textarea>
                <button class="preview-button-primary px-4 py-2 rounded-md">Submit Feedback</button>
            </div>
        </div>`,

    Settings: `
        <div class="space-y-4">
            <div class="flex items-center justify-between p-3 border border-color rounded-lg">
                <div>
                    <h4 class="font-medium">Email Notifications</h4>
                    <p class="text-sm text-secondary">Receive email updates</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only" checked>
                    <div class="w-11 h-6 rounded-full" style="background-color: var(--c1)">
                        <div class="w-5 h-5 bg-white rounded-full shadow transform translate-x-5"></div>
                    </div>
                </label>
            </div>
            <div class="flex items-center justify-between p-3 border border-color rounded-lg">
                <div>
                    <h4 class="font-medium">Dark Mode</h4>
                    <p class="text-sm text-secondary">Use dark theme</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only">
                    <div class="w-11 h-6 rounded-full bg-secondary">
                        <div class="w-5 h-5 bg-white rounded-full shadow"></div>
                    </div>
                </label>
            </div>
        </div>`
,
    Profile: `
        <div class="flex items-center space-x-4 p-4 border border-color rounded-lg">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIzMiIgZmlsbD0iIzNjODJmNiIvPjxjaXJjbGUgY3g9IjMyIiBjeT0iMjQiIHI9IjEyIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTIwIDQ4YzAtOCA1LjMzMy0xNiAxMi0xNnMxMiA4IDEyIDE2IiBmaWxsPSIjZmZmIi8+PC9zdmc+" alt="Profile" class="w-16 h-16 rounded-full">
            <div class="flex-1">
                <h4 class="font-bold text-lg">John Doe</h4>
                <p class="text-secondary">john.doe@example.com</p>
                <p class="text-sm text-secondary">Software Engineer</p>
            </div>
            <button class="preview-button-secondary px-3 py-1 rounded-md text-sm">Edit</button>
        </div>`
,
    Notifications: `
        <div class="space-y-2">
            <div class="flex items-start space-x-3 p-3 border border-color rounded-lg">
                <div class="w-2 h-2 rounded-full mt-2" style="background-color: var(--c1)"></div>
                <div class="flex-1">
                    <p class="font-medium text-sm">New message received</p>
                    <p class="text-xs text-secondary">You have a new message from Sarah</p>
                    <p class="text-xs text-secondary">2 minutes ago</p>
                </div>
            </div>
            <div class="flex items-start space-x-3 p-3 border border-color rounded-lg">
                <div class="w-2 h-2 rounded-full mt-2" style="background-color: var(--c2)"></div>
                <div class="flex-1">
                    <p class="font-medium text-sm">Task completed</p>
                    <p class="text-xs text-secondary">Project Alpha has been completed</p>
                    <p class="text-xs text-secondary">1 hour ago</p>
                </div>
            </div>
        </div>`
,
    Help: `
        <div class="space-y-4">
            <div class="p-4 border border-color rounded-lg">
                <h4 class="font-bold mb-2">How to get started?</h4>
                <p class="text-sm text-secondary mb-3">Follow these simple steps to begin using the application.</p>
                <button class="preview-button-primary px-3 py-1 rounded-md text-sm">View Guide</button>
            </div>
            <div class="p-4 border border-color rounded-lg">
                <h4 class="font-bold mb-2">Need help?</h4>
                <p class="text-sm text-secondary mb-3">Contact our support team for assistance.</p>
                <button class="preview-button-secondary px-3 py-1 rounded-md text-sm">Contact Support</button>
            </div>
        </div>`
,
    Analytics: `
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <h4 class="font-bold">Traffic Overview</h4>
                <select class="preview-input px-2 py-1 border rounded text-sm">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                </select>
            </div>
            <div class="h-32 bg-secondary rounded-lg flex items-end justify-between p-4">
                <div class="w-8 bg-accent rounded-t" style="height: 60%"></div>
                <div class="w-8 bg-accent rounded-t" style="height: 80%"></div>
                <div class="w-8 bg-accent rounded-t" style="height: 40%"></div>
                <div class="w-8 bg-accent rounded-t" style="height: 90%"></div>
                <div class="w-8 bg-accent rounded-t" style="height: 70%"></div>
                <div class="w-8 bg-accent rounded-t" style="height: 50%"></div>
                <div class="w-8 bg-accent rounded-t" style="height: 85%"></div>
            </div>
        </div>`
,
    BreadcrumbsDropdown: `
        <div class="flex items-center space-x-2 text-sm" style="color: var(--c2);">
            <a href="#" class="hover:underline" style="color: var(--c2);">Home</a>
            <span>/</span>
            <div class="relative">
                <button class="px-2 py-1 rounded bg-secondary border" style="background-color: var(--c3); border-color: var(--c2); color: var(--c1);">Dropdown ▼</button>
                <div class="absolute left-0 mt-1 w-32 rounded shadow border z-10" style="background-color: var(--c5); border-color: var(--c2);">
                    <a href="#" class="block px-4 py-2 hover:bg-accent" style="color: var(--c2);">Option 1</a>
                    <a href="#" class="block px-4 py-2 hover:bg-accent" style="color: var(--c2);">Option 2</a>
                </div>
            </div>
            <span>/</span>
            <span style="color: var(--c1);">Data</span>
        </div>`,

    VerticalTimeline: `
        <div class="relative pl-8">
            <div class="absolute left-2 top-0 h-full w-1 rounded" style="background-color: var(--c3);"></div>
            <div class="mb-8 relative">
                <div class="absolute -left-4 top-0 w-6 h-6 rounded-full flex items-center justify-center" style="background-color: var(--c2); color: var(--c5); border: 2px solid var(--c4);">1</div>
                <div class="ml-4 p-4 rounded shadow" style="background-color: var(--c5); color: var(--c1);">Step 1: Started</div>
            </div>
            <div class="mb-8 relative">
                <div class="absolute -left-4 top-0 w-6 h-6 rounded-full flex items-center justify-center" style="background-color: var(--c3); color: var(--c5); border: 2px solid var(--c4);">2</div>
                <div class="ml-4 p-4 rounded shadow" style="background-color: var(--c5); color: var(--c1);">Step 2: In Progress</div>
            </div>
            <div class="relative">
                <div class="absolute -left-4 top-0 w-6 h-6 rounded-full flex items-center justify-center" style="background-color: var(--c4); color: var(--c1); border: 2px solid var(--c2);">3</div>
                <div class="ml-4 p-4 rounded shadow" style="background-color: var(--c5); color: var(--c1);">Step 3: Done</div>
            </div>
        </div>`,

    SidebarNavCollapsible: `
        <nav class="w-56 border rounded-lg p-4" style="background-color: var(--c5); border-color: var(--c2);">
            <h4 class="font-bold mb-4" style="color: var(--c1);">Sidebar</h4>
            <ul class="space-y-2">
                <li><a href="#" class="block px-3 py-2 rounded" style="color: var(--c2);">Dashboard</a></li>
                <li><a href="#" class="block px-3 py-2 rounded" style="color: var(--c2);">Projects</a></li>
                <li><a href="#" class="block px-3 py-2 rounded" style="color: var(--c2);">Settings</a></li>
            </ul>
        </nav>`,

    NotificationBellDropdown: `
        <div class="relative inline-block">
            <button class="rounded-full p-2 border shadow" style="background-color: var(--c2); color: var(--c5); border-color: var(--c4);">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" style="color: var(--c5);" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
            </button>
            <div class="absolute right-0 mt-2 w-64 rounded shadow border z-10" style="background-color: var(--c5); border-color: var(--c2);">
                <div class="p-4 border-b" style="border-color: var(--c3); color: var(--c1);">Notifications</div>
                <ul class="divide-y" style="border-color: var(--c3);">
                    <li class="p-3" style="color: var(--c2);">New comment on your post</li>
                    <li class="p-3" style="color: var(--c2);">Project deadline approaching</li>
                </ul>
            </div>
        </div>`,

    TeamMemberGrid: `
        <div class="grid grid-cols-2 gap-4">
            <div class="border rounded-lg p-4 flex items-center space-x-3" style="background-color: var(--c5); border-color: var(--c2);">
                <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold" style="background-color: var(--c2); color: var(--c5);">JD</div>
                <div>
                    <div class="font-semibold" style="color: var(--c1);">Jane Doe</div>
                    <div class="text-xs text-secondary">Designer</div>
                </div>
            </div>
            <div class="border rounded-lg p-4 flex items-center space-x-3" style="background-color: var(--c5); border-color: var(--c2);">
                <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold" style="background-color: var(--c3); color: var(--c1);">MS</div>
                <div>
                    <div class="font-semibold" style="color: var(--c1);">Mark Smith</div>
                    <div class="text-xs text-secondary">Developer</div>
                </div>
            </div>
        </div>`,

    RoadmapBoard: `
        <div class="flex space-x-4 overflow-x-auto">
            <div class="w-56 border rounded-lg p-3" style="background-color: var(--c5); border-color: var(--c2);">
                <h4 class="font-semibold mb-2" style="color: var(--c1);">Q1</h4>
                <div class="space-y-2">
                    <div class="rounded p-2" style="background-color: var(--c2); color: var(--c5);">Launch MVP</div>
                    <div class="rounded p-2" style="background-color: var(--c3); color: var(--c1);">User Feedback</div>
                </div>
            </div>
            <div class="w-56 border rounded-lg p-3" style="background-color: var(--c5); border-color: var(--c2);">
                <h4 class="font-semibold mb-2" style="color: var(--c1);">Q2</h4>
                <div class="space-y-2">
                    <div class="rounded p-2" style="background-color: var(--c4); color: var(--c1);">New Features</div>
                </div>
            </div>
        </div>`,

    VerticalStepper: `
        <div class="flex flex-col space-y-6">
            <div class="flex items-center">
                <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold" style="background-color: var(--c2); color: var(--c5);">1</div>
                <div class="ml-4 flex-1 border-t-2" style="border-color: var(--c3);"></div>
                <div class="ml-4 text-sm" style="color: var(--c1);">Step 1</div>
            </div>
            <div class="flex items-center">
                <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold" style="background-color: var(--c3); color: var(--c1);">2</div>
                <div class="ml-4 flex-1 border-t-2" style="border-color: var(--c4);"></div>
                <div class="ml-4 text-sm" style="color: var(--c1);">Step 2</div>
            </div>
            <div class="flex items-center">
                <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold" style="background-color: var(--c4); color: var(--c1);">3</div>
                <div class="ml-4 flex-1 border-t-2" style="border-color: var(--c2);"></div>
                <div class="ml-4 text-sm" style="color: var(--c1);">Step 3</div>
            </div>
        </div>`,

    StatsTrendCard: `
        <div class="p-4 border border-color rounded-lg flex items-center space-x-4">
            <div>
                <div class="text-2xl font-bold" style="color: var(--c1)">$8,450</div>
                <div class="text-sm text-secondary">Monthly Revenue</div>
            </div>
            <div class="flex items-center ml-auto">
                <svg class="w-5 h-5 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12l5 5L20 7"></path></svg>
                <span class="text-green-500 font-semibold">+12%</span>
            </div>
        </div>`,

    UserCardActions: `
        <div class="flex items-center p-4 border border-color rounded-lg space-x-4">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyNCIgY3k9IjI0IiByPSIyNCIgZmlsbD0iIzNjODJmNiIvPjxjaXJjbGUgY3g9IjI0IiBjeT0iMTgiIHI9IjkiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTUgMzZjMC02IDQtMTIgOS0xMnM5IDYgOSAxMiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==" class="w-12 h-12 rounded-full" alt="User">
            <div class="flex-1">
                <h4 class="font-semibold">Alex Johnson</h4>
                <p class="text-secondary text-sm">Product Manager</p>
            </div>
            <button class="preview-button-primary px-3 py-1 rounded">Message</button>
            <button class="preview-button-secondary px-3 py-1 rounded">Profile</button>
        </div>`,

    ContactList: `
        <ul class="divide-y divide-color border border-color rounded-lg">
            <li class="flex items-center p-3">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNiIgZmlsbD0iIzNjODJmNiIvPjxjaXJjbGUgY3g9IjE2IiBjeT0iMTIiIHI9IjYiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTAgMjRjMC00IDMtOCA2LThzNiA0IDYgOCIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==" class="w-8 h-8 rounded-full mr-3" alt="Contact">
                <div class="flex-1">
                    <span class="font-medium">Sarah Lee</span>
                    <span class="block text-xs text-secondary">sarah.lee@company.com</span>
                </div>
                <button class="preview-button-secondary px-2 py-1 rounded text-xs">Email</button>
            </li>
            <li class="flex items-center p-3">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNiIgZmlsbD0iIzNjODJmNiIvPjxjaXJjbGUgY3g9IjE2IiBjeT0iMTIiIHI9IjYiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMTAgMjRjMC00IDMtOCA2LThzNiA0IDYgOCIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==" class="w-8 h-8 rounded-full mr-3" alt="Contact">
                <div class="flex-1">
                    <span class="font-medium">Michael Chen</span>
                    <span class="block text-xs text-secondary">michael.chen@company.com</span>
                </div>
                <button class="preview-button-secondary px-2 py-1 rounded text-xs">Email</button>
            </li>
        </ul>`,

    ActivityFeed: `
        <div class="space-y-4">
            <div class="flex items-start space-x-3">
                <div class="w-8 h-8 rounded-full flex items-center justify-center" style="background-color: var(--c2); color: var(--c5);">JD</div>
                <div>
                    <p class="font-medium" style="color: var(--c1);">John Doe <span class="text-secondary">commented on</span> Project X</p>
                    <p class="text-xs text-secondary">2 hours ago</p>
                </div>
            </div>
            <div class="flex items-start space-x-3">
                <div class="w-8 h-8 rounded-full flex items-center justify-center" style="background-color: var(--c3); color: var(--c5);">SL</div>
                <div>
                    <p class="font-medium" style="color: var(--c1);">Sarah Lee <span class="text-secondary">uploaded a file</span></p>
                    <p class="text-xs text-secondary">1 hour ago</p>
                </div>
            </div>
        </div>`,

        TimelineCalendar: `
        <div class="border rounded-lg p-4" style="border-color: var(--c3); background: var(--c5);">
            <div class="flex justify-between items-center mb-4">
                <h4 class="font-bold text-lg" style="color: var(--c1);">Timeline Calendar</h4>
                <span class="text-sm text-secondary">April 2024</span>
            </div>
            <div class="grid grid-cols-7 gap-2 text-center text-xs">
                <div class="p-1 text-secondary">Su</div>
                <div class="p-1 text-secondary">Mo</div>
                <div class="p-1 text-secondary">Tu</div>
                <div class="p-1 text-secondary">We</div>
                <div class="p-1 text-secondary">Th</div>
                <div class="p-1 text-secondary">Fr</div>
                <div class="p-1 text-secondary">Sa</div>
                <div class="p-2"></div><div class="p-2"></div><div class="p-2"></div><div class="p-2"></div><div class="p-2"></div>
                <div class="p-2" style="background: var(--c1_alpha); color: var(--c1);">1</div>
                <div class="p-2">2</div>
                <div class="p-2">3</div>
                <div class="p-2" style="background: var(--c2_alpha); color: var(--c2);">4</div>
                <div class="p-2">5</div>
                <div class="p-2">6</div>
                <div class="p-2">7</div>
                <div class="p-2">8</div>
                <div class="p-2">9</div>
                <div class="p-2">10</div>
                <div class="p-2">11</div>
                <div class="p-2" style="background: var(--c3_alpha); color: var(--c3);">12</div>
                <div class="p-2">13</div>
                <div class="p-2">14</div>
                <div class="p-2">15</div>
                <div class="p-2">16</div>
            </div>
            <div class="mt-4 flex gap-2 text-xs">
                <span class="px-2 py-1 rounded-full" style="background: var(--c1_alpha); color: var(--c1);">Meeting</span>
                <span class="px-2 py-1 rounded-full" style="background: var(--c2_alpha); color: var(--c2);">Deadline</span>
                <span class="px-2 py-1 rounded-full" style="background: var(--c3_alpha); color: var(--c3);">Event</span>
            </div>
        </div>
    `,

    ColorLegend: `
        <div class="flex flex-wrap gap-3 items-center p-4 border rounded-lg" style="border-color: var(--c2); background: var(--c5);">
            <div class="flex items-center gap-1">
                <span class="w-4 h-4 rounded-full" style="background: var(--c1);"></span>
                <span class="text-xs text-secondary">Primary</span>
            </div>
            <div class="flex items-center gap-1">
                <span class="w-4 h-4 rounded-full" style="background: var(--c2);"></span>
                <span class="text-xs text-secondary">Secondary</span>
            </div>
            <div class="flex items-center gap-1">
                <span class="w-4 h-4 rounded-full" style="background: var(--c3);"></span>
                <span class="text-xs text-secondary">Accent</span>
            </div>
            <div class="flex items-center gap-1">
                <span class="w-4 h-4 rounded-full" style="background: var(--c4);"></span>
                <span class="text-xs text-secondary">Info</span>
            </div>
            <div class="flex items-center gap-1">
                <span class="w-4 h-4 rounded-full" style="background: var(--c5);"></span>
                <span class="text-xs text-secondary">Background</span>
            </div>
        </div>
    `,

    ColorAccessibilityChecker: `
        <div class="p-4 border rounded-lg" style="border-color: var(--c3); background: var(--c5);">
            <h4 class="font-bold mb-2" style="color: var(--c1);">Accessibility Checker</h4>
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <span class="w-8 h-8 rounded" style="background: var(--c1);"></span>
                    <span class="w-8 h-8 rounded border" style="background: var(--c5); color: var(--c1); border-color: var(--c1); display: flex; align-items: center; justify-content: center;">Aa</span>
                    <span class="text-xs">Contrast: 7.2 <span class="text-green-600">✔</span></span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="w-8 h-8 rounded" style="background: var(--c2);"></span>
                    <span class="w-8 h-8 rounded border" style="background: var(--c5); color: var(--c2); border-color: var(--c2); display: flex; align-items: center; justify-content: center;">Aa</span>
                    <span class="text-xs">Contrast: 4.5 <span class="text-green-600">✔</span></span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="w-8 h-8 rounded" style="background: var(--c3);"></span>
                    <span class="w-8 h-8 rounded border" style="background: var(--c5); color: var(--c3); border-color: var(--c3); display: flex; align-items: center; justify-content: center;">Aa</span>
                    <span class="text-xs">Contrast: 3.2 <span class="text-red-600">✖</span></span>
                </div>
            </div>
        </div>
    `,

    PaletteComparisonTable: `
        <div class="p-4 border rounded-lg" style="border-color: var(--c2); background: var(--c5);">
            <h4 class="font-bold mb-2" style="color: var(--c1);">Palette Comparison</h4>
            <table class="w-full text-xs">
                <thead>
                    <tr><th>Palette A</th><th>Palette B</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td><span class="w-8 h-8 inline-block rounded" style="background: var(--c1);"></span></td>
                        <td><span class="w-8 h-8 inline-block rounded" style="background: var(--c2);"></span></td>
                    </tr>
                    <tr>
                        <td><span class="w-8 h-8 inline-block rounded" style="background: var(--c3);"></span></td>
                        <td><span class="w-8 h-8 inline-block rounded" style="background: var(--c4);"></span></td>
                    </tr>
                    <tr>
                        <td><span class="w-8 h-8 inline-block rounded" style="background: var(--c5);"></span></td>
                        <td><span class="w-8 h-8 inline-block rounded" style="background: var(--c1);"></span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,

    PaletteHistoryTimeline: `
        <div class="p-4 border rounded-lg" style="border-color: var(--c3); background: var(--c5);">
            <h4 class="font-bold mb-2" style="color: var(--c1);">Palette History</h4>
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <span class="w-4 h-4 rounded-full" style="background: var(--c1);"></span>
                    <span class="text-xs">Initial</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="w-4 h-4 rounded-full" style="background: var(--c2);"></span>
                    <span class="text-xs">Edit 1</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="w-4 h-4 rounded-full" style="background: var(--c3);"></span>
                    <span class="text-xs">Edit 2</span>
                </div>
            </div>
        </div>`,

    PalettePieChart: `
        <div class="flex flex-col items-center p-4 border rounded-lg" style="border-color: var(--c2); background: var(--c5);">
            <h4 class="font-bold mb-2" style="color: var(--c1);">Palette Pie Chart</h4>
            <svg width="80" height="80" viewBox="0 0 32 32">
                <circle r="16" cx="16" cy="16" fill="var(--c1)" />
                <path d="M16 16 L16 0 A16 16 0 0 1 32 16 Z" fill="var(--c2)" />
                <path d="M16 16 L32 16 A16 16 0 0 1 16 32 Z" fill="var(--c3)" />
                <path d="M16 16 L16 32 A16 16 0 0 1 0 16 Z" fill="var(--c4)" />
                <path d="M16 16 L0 16 A16 16 0 0 1 16 0 Z" fill="var(--c5)" />
            </svg>
        </div>
    `,

    PaletteBarChart: `
        <div class="flex flex-col items-center p-4 border rounded-lg" style="border-color: var(--c2); background: var(--c5);">
            <h4 class="font-bold mb-2" style="color: var(--c1);">Palette Bar Chart</h4>
            <div class="flex gap-1 w-full h-12 items-end">
                <div class="flex-1 rounded-t" style="background: var(--c1); height: 60%;"></div>
                <div class="flex-1 rounded-t" style="background: var(--c2); height: 80%;"></div>
                <div class="flex-1 rounded-t" style="background: var(--c3); height: 40%;"></div>
                <div class="flex-1 rounded-t" style="background: var(--c4); height: 90%;"></div>
                <div class="flex-1 rounded-t" style="background: var(--c5); height: 70%;"></div>
            </div>
        </div>
    `,

    PaletteGradientPreview: `
        <div class="p-4 border rounded-lg flex flex-col items-center" style="border-color: var(--c3); background: var(--c5);">
            <h4 class="font-bold mb-2" style="color: var(--c1);">Gradient Preview</h4>
            <div class="w-full h-8 rounded" style="background: linear-gradient(90deg, var(--c1), var(--c2), var(--c3), var(--c4), var(--c5), var(--c6), var(--c7), var(--c8));"></div>
        </div>
    `,

    PaletteUsageMap: `
        <div class="p-4 border rounded-lg" style="border-color: var(--c2); background: var(--c5);">
            <h4 class="font-bold mb-2" style="color: var(--c1);">Palette Usage Map</h4>
            <div class="grid gap-1" style="grid-template-columns: repeat(auto-fit, minmax(2rem, 1fr));">
                <div class="h-6 rounded" style="background: var(--c1);"></div>
                <div class="h-6 rounded" style="background: var(--c2);"></div>
                <div class="h-6 rounded" style="background: var(--c3);"></div>
                <div class="h-6 rounded" style="background: var(--c4);"></div>
                <div class="h-6 rounded" style="background: var(--c5);"></div>
                <div class="h-6 rounded" style="background: var(--c6);"></div>
                <div class="h-6 rounded" style="background: var(--c7);"></div>
                <div class="h-6 rounded" style="background: var(--c8);"></div>
            </div>
            <div class="mt-2 text-xs text-secondary">Each color represents a UI area (header, sidebar, content, etc.)</div>
        </div>`,

        ColorTokenTable: `
            <div class="p-4 border rounded-lg" style="border-color: var(--c3); background: var(--c5);">
            <h4 class="font-bold mb-2" style="color: var(--c1);">Color Tokens</h4>
            <table class="w-full text-xs">
                <thead>
                    <tr><th>Token</th><th>Color</th><th>CSS</th></tr>
                </thead>
                <tbody>
                    <tr><td>--c1</td><td><span class="w-6 h-6 inline-block rounded" style="background: var(--c1);"></span></td><td>var(--c1)</td></tr>
                    <tr><td>--c2</td><td><span class="w-6 h-6 inline-block rounded" style="background: var(--c2);"></span></td><td>var(--c2)</td></tr>
                    <tr><td>--c3</td><td><span class="w-6 h-6 inline-block rounded" style="background: var(--c3);"></span></td><td>var(--c3)</td></tr>
                    <tr><td>--c4</td><td><span class="w-6 h-6 inline-block rounded" style="background: var(--c4);"></span></td><td>var(--c4)</td></tr>
                    <tr><td>--c5</td><td><span class="w-6 h-6 inline-block rounded" style="background: var(--c5);"></span></td><td>var(--c5)</td></tr>
                </tbody>
            </table>
        </div>`,
        
        PaletteExportCard: `
            <div class="p-4 border rounded-lg flex flex-col gap-2" style="border-color: var(--c2); background: var(--c5);">
                <h4 class="font-bold mb-2" style="color: var(--c1);">Export Palette</h4>
                <button class="btn" style="background: var(--c1); color: var(--c5);">Export as CSS</button>
                <button class="btn" style="background: var(--c2); color: var(--c5);">Export as JSON</button>
                <button class="btn" style="background: var(--c3); color: var(--c5);">Export as SVG</button>
            </div>`,

        PaletteMoodBoard: `
            <div class="p-4 border rounded-lg" style="border-color: var(--c3); background: var(--c5);">
                <h4 class="font-bold mb-2" style="color: var(--c1);">Mood Board</h4>
                <div class="flex gap-2">
                    <div class="w-16 h-16 rounded-lg" style="background: var(--c1);"></div>
                    <div class="w-16 h-16 rounded-lg" style="background: var(--c2);"></div>
                    <div class="w-16 h-16 rounded-lg" style="background: var(--c3);"></div>
                    <div class="w-16 h-16 rounded-lg" style="background: var(--c4);"></div>
                    <div class="w-16 h-16 rounded-lg" style="background: var(--c5);"></div>
                </div>
                <div class="mt-2 text-xs text-secondary">A collage of your palette colors</div>
            </div>`,
        PaletteSwatchStack: `
            <div class="p-4 border rounded-lg flex flex-col items-center" style="border-color: var(--c2); background: var(--c5);">
                <h4 class="font-bold mb-2" style="color: var(--c1);">Swatch Stack</h4>
                <div class="flex flex-col gap-1 w-12">
                    <div class="h-6 rounded" style="background: var(--c1);"></div>
                    <div class="h-6 rounded" style="background: var(--c2);"></div>
                    <div class="h-6 rounded" style="background: var(--c3);"></div>
                    <div class="h-6 rounded" style="background: var(--c4);"></div>
                    <div class="h-6 rounded" style="background: var(--c5);"></div>
                </div>
            </div>`,    

        PaletteCircularSwatchGroup: `
        <div class="p-4 border rounded-lg flex flex-col items-center" style="border-color: var(--c3); background: var(--c5);">
            <h4 class="font-bold mb-2" style="color: var(--c1);">Circular Swatch Group</h4>
            <div class="relative w-24 h-24">
                <span class="absolute w-8 h-8 rounded-full" style="background: var(--c1); left: 50%; top: 0; transform: translate(-50%, 0);"></span>
                <span class="absolute w-8 h-8 rounded-full" style="background: var(--c2); left: 100%; top: 50%; transform: translate(-100%, -50%);"></span>
                <span class="absolute w-8 h-8 rounded-full" style="background: var(--c3); left: 50%; top: 100%; transform: translate(-50%, -100%);"></span>
                <span class="absolute w-8 h-8 rounded-full" style="background: var(--c4); left: 0; top: 50%; transform: translate(0, -50%);"></span>
                <span class="absolute w-8 h-8 rounded-full" style="background: var(--c5); left: 50%; top: 50%; transform: translate(-50%, -50%);"></span>
            </div>
        </div>`,

    PaletteTypographyDemo: `
        <div class="p-4 border rounded-lg" style="border-color: var(--c2); background: var(--c5);">
            <h4 class="font-bold mb-2" style="color: var(--c1);">Typography Demo</h4>
            <h1 style="color: var(--c1);">Heading 1</h1>
            <h2 style="color: var(--c2);">Heading 2</h2>
            <h3 style="color: var(--c3);">Heading 3</h3>
            <p style="color: var(--c4);">Body text using c4</p>
            <a href="#" style="color: var(--c5); text-decoration: underline;">Link using c5</a>
        </div>`,

    PaletteButtonGroup: `
        <div class="p-4 border rounded-lg flex flex-col items-center" style="border-color: var(--c3); background: var(--c5);">
            <h4 class="font-bold mb-2" style="color: var(--c1);">Button Group</h4>
            <div class="flex gap-2">
                <button class="px-4 py-2 rounded" style="background: var(--c1); color: var(--c5);">C1</button>
                <button class="px-4 py-2 rounded" style="background: var(--c2); color: var(--c5);">C2</button>
                <button class="px-4 py-2 rounded" style="background: var(--c3); color: var(--c5);">C3</button>
                <button class="px-4 py-2 rounded" style="background: var(--c4); color: var(--c5);">C4</button>
                <button class="px-4 py-2 rounded" style="background: var(--c5); color: var(--c1);">C5</button>
            </div>
        </div>`,

            PaletteCardDeck: `
        <div class="p-4 border rounded-lg flex gap-2" style="border-color: var(--c2); background: var(--c5);">
            <div class="flex-1 rounded-lg p-2" style="background: var(--c1); color: var(--c5);">Card 1</div>
            <div class="flex-1 rounded-lg p-2" style="background: var(--c2); color: var(--c5);">Card 2</div>
            <div class="flex-1 rounded-lg p-2" style="background: var(--c3); color: var(--c5);">Card 3</div>
            <div class="flex-1 rounded-lg p-2" style="background: var(--c4); color: var(--c5);">Card 4</div>
            <div class="flex-1 rounded-lg p-2" style="background: var(--c5); color: var(--c1);">Card 5</div>
        </div>`,

    ColorSchemeGenerator: `
        <div class="p-4 border rounded-lg" style="border-color: var(--c2); background: var(--c5);">
            <h4 class="font-bold mb-3" style="color: var(--c1);">Color Scheme Generator</h4>
            <div class="grid grid-cols-5 gap-2 mb-3">
                <div class="h-12 rounded-lg border-2 border-dashed flex items-center justify-center" style="border-color: var(--c1); background: var(--c1_alpha);">
                    <span class="text-xs font-medium" style="color: var(--c1);">Primary</span>
                </div>
                <div class="h-12 rounded-lg border-2 border-dashed flex items-center justify-center" style="border-color: var(--c2); background: var(--c2_alpha);">
                    <span class="text-xs font-medium" style="color: var(--c2);">Secondary</span>
                </div>
                <div class="h-12 rounded-lg border-2 border-dashed flex items-center justify-center" style="border-color: var(--c3); background: var(--c3_alpha);">
                    <span class="text-xs font-medium" style="color: var(--c3);">Accent</span>
                </div>
                <div class="h-12 rounded-lg border-2 border-dashed flex items-center justify-center" style="border-color: var(--c4); background: var(--c4_alpha);">
                    <span class="text-xs font-medium" style="color: var(--c4);">Info</span>
                </div>
                <div class="h-12 rounded-lg border-2 border-dashed flex items-center justify-center" style="border-color: var(--c5); background: var(--c5_alpha);">
                    <span class="text-xs font-medium" style="color: var(--c5);">Background</span>
                </div>
            </div>
            <div class="flex gap-2">
                <button class="px-3 py-1 rounded text-xs" style="background: var(--c1); color: var(--c5);">Generate</button>
                <button class="px-3 py-1 rounded text-xs" style="background: var(--c2); color: var(--c5);">Export</button>
            </div>
        </div>`,

    ColorHarmonyVisualizer: `
        <div class="p-4 border rounded-lg" style="border-color: var(--c3); background: var(--c5);">
            <h4 class="font-bold mb-3" style="color: var(--c1);">Color Harmony</h4>
            <div class="flex justify-center mb-3">
                <div class="relative w-32 h-32">
                    <div class="absolute inset-0 rounded-full border-4" style="border-color: var(--c1);"></div>
                    <div class="absolute inset-0 rounded-full border-4 border-dashed" style="border-color: var(--c2); transform: rotate(60deg);"></div>
                    <div class="absolute inset-0 rounded-full border-4 border-dotted" style="border-color: var(--c3); transform: rotate(120deg);"></div>
                    <div class="absolute inset-0 rounded-full border-4 border-double" style="border-color: var(--c4); transform: rotate(180deg);"></div>
                    <div class="absolute inset-0 rounded-full border-4 border-solid" style="border-color: var(--c5); transform: rotate(240deg);"></div>
                </div>
            </div>
            <div class="text-center text-xs text-secondary">Harmony visualization using your palette</div>
        </div>`,

    ColorContrastMatrix: `
        <div class="p-4 border rounded-lg" style="border-color: var(--c2); background: var(--c5);">
            <h4 class="font-bold mb-3" style="color: var(--c1);">Contrast Matrix</h4>
            <div class="grid grid-cols-5 gap-1 text-xs">
                <div class="h-8 flex items-center justify-center font-bold" style="background: var(--c1); color: var(--c5);">C1</div>
                <div class="h-8 flex items-center justify-center" style="background: var(--c2); color: var(--c5);">C2</div>
                <div class="h-8 flex items-center justify-center" style="background: var(--c3); color: var(--c5);">C3</div>
                <div class="h-8 flex items-center justify-center" style="background: var(--c4); color: var(--c5);">C4</div>
                <div class="h-8 flex items-center justify-center" style="background: var(--c5); color: var(--c1);">C5</div>
                <div class="h-8 flex items-center justify-center" style="background: var(--c2); color: var(--c5);">C2</div>
                <div class="h-8 flex items-center justify-center font-bold" style="background: var(--c2); color: var(--c5);">C2</div>
                <div class="h-8 flex items-center justify-center" style="background: var(--c3); color: var(--c5);">C3</div>
                <div class="h-8 flex items-center justify-center" style="background: var(--c4); color: var(--c5);">C4</div>
                <div class="h-8 flex items-center justify-center" style="background: var(--c5); color: var(--c1);">C5</div>
                <div class="h-8 flex items-center justify-center" style="background: var(--c3); color: var(--c5);">C3</div>
                <div class="h-8 flex items-center justify-center" style="background: var(--c3); color: var(--c5);">C3</div>
                <div class="h-8 flex items-center justify-center font-bold" style="background: var(--c3); color: var(--c5);">C3</div>
                <div class="h-8 flex items-center justify-center" style="background: var(--c4); color: var(--c5);">C4</div>
                <div class="h-8 flex items-center justify-center" style="background: var(--c5); color: var(--c1);">C5</div>
                <div class="h-8 flex items-center justify-center" style="background: var(--c4); color: var(--c5);">C4</div>
                <div class="h-8 flex items-center justify-center" style="background: var(--c4); color: var(--c5);">C4</div>
                <div class="h-8 flex items-center justify-center" style="background: var(--c4); color: var(--c5);">C4</div>
                <div class="h-8 flex items-center justify-center font-bold" style="background: var(--c4); color: var(--c5);">C4</div>
                <div class="h-8 flex items-center justify-center" style="background: var(--c5); color: var(--c1);">C5</div>
                <div class="h-8 flex items-center justify-center" style="background: var(--c5); color: var(--c1);">C5</div>
                <div class="h-8 flex items-center justify-center" style="background: var(--c5); color: var(--c1);">C5</div>
                <div class="h-8 flex items-center justify-center" style="background: var(--c5); color: var(--c1);">C5</div>
                <div class="h-8 flex items-center justify-center" style="background: var(--c5); color: var(--c1);">C5</div>
            </div>
            <div class="text-xs text-secondary mt-2">Visualize contrast between every palette color pair for accessibility.</div>
        </div>`,

    NotificationBanner: `
        <div class="w-full p-4 border-l-4 rounded-r-lg" style="border-left-color: var(--c1); background-color: var(--c1_alpha);">
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    <svg class="h-5 w-5" style="color: var(--c1)" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                    </svg>
                </div>
                <div class="ml-3 flex-1">
                    <h3 class="text-sm font-medium" style="color: var(--c1)">System Update</h3>
                    <div class="mt-2 text-sm">
                        <p style="color: var(--c2)">A new version is available. Please update your system to continue.</p>
                    </div>
                </div>
                <div class="ml-auto pl-3">
                    <button class="text-sm font-medium" style="color: var(--c1)">Dismiss</button>
                </div>
            </div>
        </div>`,

    ColorfulTimeline: `
        <div class="space-y-4">
            <div class="flex items-start space-x-4">
                <div class="w-3 h-3 rounded-full mt-2" style="background-color: var(--c1)"></div>
                <div class="flex-1">
                    <h4 class="font-semibold" style="color: var(--c1)">Project Started</h4>
                    <p class="text-sm text-secondary">Initial planning and setup</p>
                    <span class="text-xs text-secondary">2 days ago</span>
                </div>
            </div>
            <div class="flex items-start space-x-4">
                <div class="w-3 h-3 rounded-full mt-2" style="background-color: var(--c2)"></div>
                <div class="flex-1">
                    <h4 class="font-semibold" style="color: var(--c2)">Design Phase</h4>
                    <p class="text-sm text-secondary">UI/UX design completed</p>
                    <span class="text-xs text-secondary">1 day ago</span>
                </div>
            </div>
            <div class="flex items-start space-x-4">
                <div class="w-3 h-3 rounded-full mt-2" style="background-color: var(--c3)"></div>
                <div class="flex-1">
                    <h4 class="font-semibold" style="color: var(--c3)">Development</h4>
                    <p class="text-sm text-secondary">Core features implemented</p>
                    <span class="text-xs text-secondary">Today</span>
                </div>
            </div>
            <div class="flex items-start space-x-4">
                <div class="w-3 h-3 rounded-full mt-2" style="background-color: var(--c4)"></div>
                <div class="flex-1">
                    <h4 class="font-semibold" style="color: var(--c4)">Testing</h4>
                    <p class="text-sm text-secondary">Quality assurance in progress</p>
                    <span class="text-xs text-secondary">Tomorrow</span>
                </div>
            </div>
        </div>`,

    ColorfulTags: `
        <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-medium" style="background-color: var(--c1_alpha); color: var(--c1); border: 1px solid var(--c1);">Primary Tag</span>
            <span class="px-3 py-1 rounded-full text-xs font-medium" style="background-color: var(--c2_alpha); color: var(--c2); border: 1px solid var(--c2);">Secondary Tag</span>
            <span class="px-3 py-1 rounded-full text-xs font-medium" style="background-color: var(--c3_alpha); color: var(--c3); border: 1px solid var(--c3);">Accent Tag</span>
            <span class="px-3 py-1 rounded-full text-xs font-medium" style="background-color: var(--c4_alpha); color: var(--c4); border: 1px solid var(--c4);">Info Tag</span>
            <span class="px-3 py-1 rounded-full text-xs font-medium" style="background-color: var(--c5_alpha); color: var(--c5); border: 1px solid var(--c5);">Background Tag</span>
        </div>`,

    ColorfulCharts: `
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <h4 class="font-semibold" style="color: var(--c1)">Chart Widgets</h4>
                <span class="text-sm text-secondary">Using your palette</span>
            </div>
            <div class="grid grid-cols-3 gap-4">
                <div class="text-center">
                    <div class="w-16 h-16 mx-auto mb-2 relative">
                        <svg class="w-16 h-16" viewBox="0 0 32 32">
                            <circle r="16" cx="16" cy="16" fill="var(--c1)" />
                            <path d="M16 16 L16 0 A16 16 0 0 1 32 16 Z" fill="var(--c2)" />
                            <path d="M16 16 L32 16 A16 16 0 0 1 16 32 Z" fill="var(--c3)" />
                        </svg>
                    </div>
                    <span class="text-xs text-secondary">Pie Chart</span>
                </div>
                <div class="text-center">
                    <div class="flex items-end justify-center h-16 mb-2 gap-1">
                        <div class="w-4 rounded-t" style="background: var(--c1); height: 60%;"></div>
                        <div class="w-4 rounded-t" style="background: var(--c2); height: 80%;"></div>
                        <div class="w-4 rounded-t" style="background: var(--c3); height: 40%;"></div>
                        <div class="w-4 rounded-t" style="background: var(--c4); height: 90%;"></div>
                    </div>
                    <span class="text-xs text-secondary">Bar Chart</span>
                </div>
                <div class="text-center">
                    <div class="w-16 h-16 mx-auto mb-2 relative">
                        <svg class="w-16 h-16" viewBox="0 0 32 32">
                            <circle r="14" cx="16" cy="16" fill="none" stroke="var(--c3)" stroke-width="4" />
                            <circle r="14" cx="16" cy="16" fill="none" stroke="var(--c1)" stroke-width="4" stroke-dasharray="60 100" stroke-dashoffset="25" />
                        </svg>
                    </div>
                    <span class="text-xs text-secondary">Donut Chart</span>
                </div>
            </div>
        </div>`,

    CTASection: `
        <div class="p-8 rounded-lg text-center" style="background: linear-gradient(135deg, var(--c1) 0%, var(--c2) 100%); color: var(--c5);">
            <h3 class="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p class="text-lg mb-6 opacity-90">Join thousands of users who trust our platform</p>
            <div class="flex justify-center gap-4">
                <button class="px-6 py-3 rounded-lg font-semibold" style="background: var(--c5); color: var(--c1);">Get Started</button>
                <button class="px-6 py-3 rounded-lg font-semibold border-2" style="border-color: var(--c5); color: var(--c5);">Learn More</button>
            </div>
        </div>`,

    ColorfulSidebar: `
        <div class="flex h-48">
            <div class="w-48 border-r" style="border-color: var(--c2); background: var(--c5);">
                <div class="p-4">
                    <h3 class="font-bold mb-4" style="color: var(--c1);">Navigation</h3>
                    <div class="space-y-2">
                        <div class="p-2 rounded-md" style="background-color: var(--c1_alpha); color: var(--c1);">Dashboard</div>
                        <div class="p-2 rounded-md" style="color: var(--c2);">Analytics</div>
                        <div class="p-2 rounded-md" style="color: var(--c2);">Settings</div>
                        <div class="p-2 rounded-md" style="color: var(--c2);">Profile</div>
                    </div>
                </div>
            </div>
            <div class="flex-1 p-4">
                <p class="text-secondary">Main content area with sidebar navigation</p>
            </div>
        </div>`,

    StatusIndicators: `
        <div class="flex items-center space-x-6">
            <div class="flex items-center space-x-2">
                <div class="w-3 h-3 rounded-full" style="background-color: var(--c1)"></div>
                <span class="text-sm" style="color: var(--c1)">Online</span>
            </div>
            <div class="flex items-center space-x-2">
                <div class="w-3 h-3 rounded-full" style="background-color: var(--c2)"></div>
                <span class="text-sm" style="color: var(--c2)">Active</span>
            </div>
            <div class="flex items-center space-x-2">
                <div class="w-3 h-3 rounded-full" style="background-color: var(--c3)"></div>
                <span class="text-sm" style="color: var(--c3)">Warning</span>
            </div>
            <div class="flex items-center space-x-2">
                <div class="w-3 h-3 rounded-full" style="background-color: var(--c4)"></div>
                <span class="text-sm" style="color: var(--c4)">Error</span>
            </div>
            <div class="flex items-center space-x-2">
                <div class="w-3 h-3 rounded-full border-2" style="border-color: var(--c5); background-color: var(--c5_alpha);"></div>
                <span class="text-sm" style="color: var(--c5)">Offline</span>
            </div>
        </div>`,
    
    // PRELOADER COMPONENTS - Enhanced with color palette integration
    LoadingSpinner: `
        <div class="flex items-center justify-center space-x-3">
            <div class="relative">
                <div class="w-8 h-8 border-4 border-transparent rounded-full animate-spin" style="border-top-color: var(--c1); border-right-color: var(--c2); border-bottom-color: var(--c3); border-left-color: var(--c4);"></div>
                <div class="absolute inset-0 w-8 h-8 border-4 border-transparent rounded-full animate-ping" style="border-color: var(--c5); opacity-0.3;"></div>
            </div>
            <span class="text-sm font-medium" style="color: var(--c1);">Loading...</span>
        </div>`,
    
    ProgressBar: `
        <div class="space-y-3">
            <div class="flex justify-between text-sm">
                <span style="color: var(--c1);">Upload Progress</span>
                <span style="color: var(--c2);">75%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="h-2.5 rounded-full smooth-transition" style="background: linear-gradient(90deg, var(--c1) 0%, var(--c2) 50%, var(--c3) 100%); width: 75%"></div>
            </div>
            <div class="flex justify-between text-xs text-gray-500">
                <span>0 MB</span>
                <span>100 MB</span>
            </div>
        </div>`,
    
    SkeletonLoader: `
        <div class="space-y-3 animate-pulse">
            <div class="flex items-center space-x-4">
                <div class="rounded-full" style="background-color: var(--c1); width: 12px; height: 12px;"></div>
                <div class="flex-1 space-y-2">
                    <div class="h-4 rounded" style="background-color: var(--c2); width: 3/4;"></div>
                    <div class="h-4 rounded" style="background-color: var(--c3); width: 1/2;"></div>
                </div>
            </div>
            <div class="space-y-2">
                <div class="h-4 rounded" style="background-color: var(--c4); width: 5/6;"></div>
                <div class="h-4 rounded" style="background-color: var(--c5); width: 2/3;"></div>
            </div>
        </div>`,
    
    LoadingDots: `
        <div class="flex items-center justify-center space-x-2">
            <div class="w-3 h-3 rounded-full animate-bounce" style="background-color: var(--c1); animation-delay: 0ms;"></div>
            <div class="w-3 h-3 rounded-full animate-bounce" style="background-color: var(--c2); animation-delay: 150ms;"></div>
            <div class="w-3 h-3 rounded-full animate-bounce" style="background-color: var(--c3); animation-delay: 300ms;"></div>
        </div>`,
    
    LoadingPulse: `
        <div class="flex items-center justify-center">
            <div class="relative">
                <div class="w-12 h-12 rounded-full animate-ping" style="background-color: var(--c1); opacity-0.75;"></div>
                <div class="absolute top-0 left-0 w-12 h-12 rounded-full" style="background-color: var(--c2);"></div>
            </div>
            <span class="ml-3 text-sm font-medium" style="color: var(--c3);">Processing...</span>
        </div>`,
    
    LoadingRing: `
        <div class="flex items-center justify-center space-x-4">
            <div class="relative">
                <div class="w-10 h-10 border-4 border-gray-200 rounded-full"></div>
                <div class="absolute top-0 left-0 w-10 h-10 border-4 border-transparent rounded-full animate-spin" style="border-top-color: var(--c1); border-right-color: var(--c2); border-bottom-color: var(--c3); border-left-color: var(--c4);"></div>
            </div>
            <div class="text-sm font-medium" style="color: var(--c5);">Initializing...</div>
        </div>`,
    
    LoadingWave: `
        <div class="flex items-center justify-center space-x-1">
            <div class="w-2 h-8 rounded-full animate-pulse" style="background-color: var(--c1); animation-delay: 0ms;"></div>
            <div class="w-2 h-8 rounded-full animate-pulse" style="background-color: var(--c2); animation-delay: 100ms;"></div>
            <div class="h-8 rounded-full animate-pulse" style="background-color: var(--c3); animation-delay: 200ms;"></div>
            <div class="w-2 h-8 rounded-full animate-pulse" style="background-color: var(--c4); animation-delay: 300ms;"></div>
            <div class="w-2 h-8 rounded-full animate-pulse" style="background-color: var(--c5); animation-delay: 400ms;"></div>
            <div class="w-2 h-8 rounded-full animate-pulse" style="background-color: var(--c6); animation-delay: 500ms;"></div>
            <div class="w-2 h-8 rounded-full animate-pulse" style="background-color: var(--c7); animation-delay: 600ms;"></div>
            <div class="w-2 h-8 rounded-full animate-pulse" style="background-color: var(--c8); animation-delay: 700ms;"></div>
        </div>`,
    
    LoadingCard: `
        <div class="border rounded-lg p-4 space-y-4 animate-pulse">
            <div class="flex items-center space-x-4">
                <div class="rounded-full" style="background-color: var(--c1); width: 16px; height: 16px;"></div>
                <div class="flex-1 space-y-2">
                    <div class="h-4 rounded" style="background-color: var(--c2); width: 1/4;"></div>
                    <div class="h-4 rounded" style="background-color: var(--c3); width: 1/2;"></div>
                </div>
            </div>
            <div class="space-y-2">
                <div class="h-4 rounded" style="background-color: var(--c4); width: 3/4;"></div>
                <div class="h-4 rounded" style="background-color: var(--c5); width: 1/3;"></div>
            </div>
            <div class="flex space-x-2">
                <div class="h-8 rounded" style="background-color: var(--c1); width: 20px;"></div>
                <div class="h-8 rounded" style="background-color: var(--c2); width: 60px;"></div>
            </div>
        </div>`,
    
    LoadingTable: `
        <div class="border rounded-lg overflow-hidden animate-pulse">
            <div class="p-4 border-b" style="background-color: var(--c1_alpha);">
                <div class="h-5 rounded" style="background-color: var(--c2); width: 1/3;"></div>
            </div>
            <div class="p-4 space-y-3">
                <div class="flex space-x-4">
                    <div class="h-4 rounded" style="background-color: var(--c3); width: 1/4;"></div>
                    <div class="h-4 rounded" style="background-color: var(--c4); width: 1/3;"></div>
                    <div class="h-4 rounded" style="background-color: var(--c5); width: 1/6;"></div>
                </div>
                <div class="flex space-x-4">
                    <div class="h-4 rounded" style="background-color: var(--c1); width: 1/5;"></div>
                    <div class="h-4 rounded" style="background-color: var(--c2); width: 1/2;"></div>
                    <div class="h-4 rounded" style="background-color: var(--c3); width: 1/4;"></div>
                </div>
            </div>
        </div>`,
    
    // ADVANCED PRELOADER COMPONENTS - Maximum color palette integration
    'LoadingOrbit': `
        <div class="flex items-center justify-center space-x-4">
            <div class="relative w-16 h-16">
                <div class="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-spin" style="border-top-color: var(--c1); border-right-color: var(--c2); border-bottom-color: var(--c3); border-left-color: var(--c4);"></div>
                <div class="absolute top-1/2 left-1/2 w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping" style="background-color: var(--c5);"></div>
                <div class="absolute top-0 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2 animate-bounce" style="background-color: var(--c1);"></div>
                <div class="absolute top-1/2 right-0 w-2 h-2 rounded-full transform translate-y-1/2 animate-bounce" style="background-color: var(--c2); animation-delay: 0.5s;"></div>
            </div>
            <span class="text-sm font-medium" style="color: var(--c3);">Orbital Loading...</span>
        </div>`,
    
    'LoadingHexagon': `
        <div class="flex items-center justify-center space-x-4">
            <div class="relative">
                <div class="w-12 h-12 relative">
                    <div class="absolute inset-0 w-12 h-12 transform rotate-45 animate-pulse" style="background: linear-gradient(45deg, var(--c1) 0%, var(--c2) 25%, var(--c3) 50%, var(--c4) 75%, var(--c5) 100%);"></div>
                    <div class="absolute inset-1 w-10 h-10 transform rotate-45 bg-secondary"></div>
                    <div class="absolute inset-2 w-8 h-8 transform rotate-45 animate-spin" style="background: linear-gradient(45deg, var(--c5) 0%, var(--c1) 20%, var(--c2) 40%, var(--c3) 60%, var(--c4) 80%, var(--c5) 100%);"></div>
                </div>
            </div>
            <span class="text-sm font-medium" style="color: var(--c1);">Hexagonal Loading...</span>
        </div>`,
    
    'LoadingStairs': `
        <div class="flex items-center justify-center space-x-4">
            <div class="flex items-end space-x-1">
                <div class="w-3 h-3 rounded-sm animate-pulse" style="background-color: var(--c1); animation-delay: 0ms;"></div>
                <div class="w-3 h-6 rounded-sm animate-pulse" style="background-color: var(--c2); animation-delay: 100ms;"></div>
                <div class="w-3 h-9 rounded-sm animate-pulse" style="background-color: var(--c3); animation-delay: 200ms;"></div>
                <div class="w-3 h-12 rounded-sm animate-pulse" style="background-color: var(--c4); animation-delay: 300ms;"></div>
                <div class="w-3 h-15 rounded-sm animate-pulse" style="background-color: var(--c5); animation-delay: 400ms;"></div>
            </div>
            <span class="text-sm font-medium" style="color: var(--c2);">Staircase Loading...</span>
        </div>`,
    
    'LoadingMorph': `
        <div class="flex items-center justify-center space-x-4">
            <div class="relative w-12 h-12">
                <div class="absolute inset-0 w-12 h-12 rounded-full animate-pulse" style="background: radial-gradient(circle, var(--c1) 0%, var(--c2) 25%, var(--c3) 50%, var(--c4) 75%, var(--c5) 100%); animation-duration: 2s;"></div>
                <div class="absolute inset-2 w-8 h-8 rounded-lg animate-pulse transform rotate-45" style="background: linear-gradient(45deg, var(--c5) 0%, var(--c1) 50%, var(--c2) 100%); animation-duration: 1.5s; animation-delay: 0.5s;"></div>
                <div class="absolute inset-4 w-4 h-4 rounded-full animate-ping" style="background-color: var(--c3);"></div>
            </div>
            <span class="text-sm font-medium" style="color: var(--c4);">Morphing Loading...</span>
        </div>`,
    
    'LoadingRipple': `
        <div class="flex items-center justify-center space-x-4">
            <div class="relative w-12 h-12">
                <div class="absolute inset-0 w-12 h-12 rounded-full animate-ping" style="background-color: var(--c1); animation-delay: 0ms;"></div>
                <div class="absolute inset-0 w-12 h-12 rounded-full animate-ping" style="background-color: var(--c2); animation-delay: 300ms;"></div>
                <div class="absolute inset-0 w-12 h-12 rounded-full animate-ping" style="background-color: var(--c3); animation-delay: 600ms;"></div>
                <div class="absolute inset-0 w-12 h-12 rounded-full animate-ping" style="background-color: var(--c4); animation-delay: 900ms;"></div>
                <div class="absolute inset-0 w-12 h-12 rounded-full animate-ping" style="background-color: var(--c5); animation-delay: 1200ms;"></div>
            </div>
            <span class="text-sm font-medium" style="color: var(--c1);">Ripple Loading...</span>
        </div>`,
    
    'LoadingSpiral': `
        <div class="flex items-center justify-center space-x-4">
            <div class="relative w-16 h-16">
                <div class="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-spin" style="border-top-color: var(--c1); border-right-color: var(--c2); border-bottom-color: var(--c3); border-left-color: var(--c4);"></div>
                <div class="absolute inset-2 w-12 h-12 border-4 border-transparent rounded-full animate-spin" style="border-top-color: var(--c5); border-right-color: var(--c1); border-bottom-color: var(--c2); border-left-color: var(--c3); animation-direction: reverse; animation-duration: 1.5s;"></div>
                <div class="absolute inset-4 w-8 h-8 border-4 border-transparent rounded-full animate-spin" style="border-top-color: var(--c4); border-right-color: var(--c5); border-bottom-color: var(--c1); border-left-color: var(--c2); animation-duration: 0.75s;"></div>
            </div>
            <span class="text-sm font-medium" style="color: var(--c3);">Spiral Loading...</span>
        </div>`,
    
    'LoadingMatrix': `
        <div class="flex items-center justify-center space-x-4">
            <div class="grid grid-cols-3 gap-1">
                <div class="w-3 h-3 rounded-sm animate-pulse" style="background-color: var(--c1); animation-delay: 0ms;"></div>
                <div class="w-3 h-3 rounded-sm animate-pulse" style="background-color: var(--c2); animation-delay: 100ms;"></div>
                <div class="w-3 h-3 rounded-sm animate-pulse" style="background-color: var(--c3); animation-delay: 200ms;"></div>
                <div class="w-3 h-3 rounded-sm animate-pulse" style="background-color: var(--c4); animation-delay: 300ms;"></div>
                <div class="w-3 h-3 rounded-sm animate-pulse" style="background-color: var(--c5); animation-delay: 400ms;"></div>
                <div class="w-3 h-3 rounded-sm animate-pulse" style="background-color: var(--c1); animation-delay: 500ms;"></div>
                <div class="w-3 h-3 rounded-sm animate-pulse" style="background-color: var(--c2); animation-delay: 600ms;"></div>
                <div class="w-3 h-3 rounded-sm animate-pulse" style="background-color: var(--c3); animation-delay: 700ms;"></div>
                <div class="w-3 h-3 rounded-sm animate-pulse" style="background-color: var(--c4); animation-delay: 800ms;"></div>
            </div>
            <span class="text-sm font-medium" style="color: var(--c5);">Matrix Loading...</span>
        </div>`,
    
    'LoadingFractal': `
        <div class="flex items-center justify-center space-x-4">
            <div class="relative w-16 h-16">
                <div class="absolute inset-0 w-16 h-16 border-2 border-transparent rounded-full animate-spin" style="border-top-color: var(--c1); border-right-color: var(--c2); border-bottom-color: var(--c3); border-left-color: var(--c4);"></div>
                <div class="absolute inset-2 w-12 h-12 border-2 border-transparent rounded-full animate-spin" style="border-top-color: var(--c5); border-right-color: var(--c1); border-bottom-color: var(--c2); border-left-color: var(--c3); animation-direction: reverse; animation-duration: 2s;"></div>
                <div class="absolute inset-4 w-8 h-8 border-2 border-transparent rounded-full animate-spin" style="border-top-color: var(--c4); border-right-color: var(--c5); border-bottom-color: var(--c1); border-left-color: var(--c2); animation-duration: 1s;"></div>
                <div class="absolute inset-6 w-4 h-4 border-2 border-transparent rounded-full animate-spin" style="border-top-color: var(--c3); border-right-color: var(--c4); border-bottom-color: var(--c5); border-left-color: var(--c1); animation-duration: 0.5s;"></div>
            </div>
            <span class="text-sm font-medium" style="color: var(--c2);">Fractal Loading...</span>
        </div>`,
    
    'LoadingNeon': `
        <div class="flex items-center justify-center space-x-4">
            <div class="relative w-12 h-12">
                <div class="absolute inset-0 w-12 h-12 rounded-full animate-pulse" style="background: radial-gradient(circle, var(--c1) 0%, transparent 70%); box-shadow: 0 0 20px var(--c1); animation-duration: 1.5s;"></div>
                <div class="absolute inset-2 w-8 h-8 rounded-full animate-pulse" style="background: radial-gradient(circle, var(--c2) 0%, transparent 70%); box-shadow: 0 0 15px var(--c2); animation-duration: 1.5s; animation-delay: 0.5s;"></div>
                <div class="absolute inset-4 w-4 h-4 rounded-full animate-pulse" style="background: radial-gradient(circle, var(--c3) 0%, transparent 70%); box-shadow: 0 0 10px var(--c3); animation-duration: 1.5s; animation-delay: 1s;"></div>
            </div>
            <span class="text-sm font-medium" style="color: var(--c4); text-shadow: 0 0 10px var(--c4);">Neon Loading...</span>
        </div>`,
    
            'LoadingGradient': `
            <div class="flex items-center justify-center space-x-4">
                <div class="relative w-16 h-16">
                    <div class="absolute inset-0 w-16 h-16 rounded-full animate-spin" style="background: conic-gradient(from 0deg, var(--c1) 0deg, var(--c2) 45deg, var(--c3) 90deg, var(--c4) 135deg, var(--c5) 180deg, var(--c6) 225deg, var(--c7) 270deg, var(--c8) 315deg, var(--c1) 360deg);"></div>
                    <div class="absolute inset-2 w-12 h-12 rounded-full bg-secondary"></div>
                    <div class="absolute inset-4 w-8 h-8 rounded-full animate-pulse" style="background: linear-gradient(45deg, var(--c1), var(--c2), var(--c3), var(--c4), var(--c5), var(--c6), var(--c7), var(--c8));"></div>
                </div>
                <span class="text-sm font-medium" style="color: var(--c3);">Gradient Loading...</span>
            </div>`,
        
        // STRATEGIC HIGH-VALUE COMPONENTS - Frontend Developer & Learner Focused
        'BarChart': `
            <div class="space-y-4">
                <h3 class="text-lg font-semibold" style="color: var(--c1);">Monthly Sales</h3>
                <div class="flex items-end justify-between h-32 space-x-2">
                    <div class="flex flex-col items-center space-y-2">
                        <div class="w-8 rounded-t" style="background: linear-gradient(to top, var(--c1), var(--c2)); height: 60%;"></div>
                        <span class="text-xs" style="color: var(--c3);">Jan</span>
                    </div>
                    <div class="flex flex-col items-center space-y-2">
                        <div class="w-8 rounded-t" style="background: linear-gradient(to top, var(--c2), var(--c3)); height: 80%;"></div>
                        <span class="text-xs" style="color: var(--c3);">Feb</span>
                    </div>
                    <div class="flex flex-col items-center space-y-2">
                        <div class="w-8 rounded-t" style="background: linear-gradient(to top, var(--c3), var(--c4)); height: 45%;"></div>
                        <span class="text-xs" style="color: var(--c3);">Mar</span>
                    </div>
                    <div class="flex flex-col items-center space-y-2">
                        <div class="w-8 rounded-t" style="background: linear-gradient(to top, var(--c4), var(--c5)); height: 90%;"></div>
                        <span class="text-xs" style="color: var(--c3);">Apr</span>
                    </div>
                    <div class="flex flex-col items-center space-y-2">
                        <div class="w-8 rounded-t" style="background: linear-gradient(to top, var(--c5), var(--c1)); height: 70%;"></div>
                        <span class="text-xs" style="color: var(--c3);">May</span>
                    </div>
                </div>
            </div>`,
        
        'LineChart': `
            <div class="space-y-4">
                <h3 class="text-lg font-semibold" style="color: var(--c1);">Revenue Trend</h3>
                <div class="relative h-32">
                    <svg class="w-full h-full" viewBox="0 0 200 100">
                        <path d="M20 80 L60 60 L100 40 L140 70 L180 30" 
                              fill="none" 
                              stroke="var(--c1)" 
                              stroke-width="3" 
                              stroke-linecap="round" 
                              stroke-linejoin="round"/>
                        <circle cx="20" cy="80" r="3" style="fill: var(--c2);"/>
                        <circle cx="60" cy="60" r="3" style="fill: var(--c3);"/>
                        <circle cx="100" cy="40" r="3" style="fill: var(--c4);"/>
                        <circle cx="140" cy="70" r="3" style="fill: var(--c5);"/>
                        <circle cx="180" cy="30" r="3" style="fill: var(--c1);"/>
                    </svg>
                    <div class="absolute bottom-0 left-0 right-0 flex justify-between text-xs" style="color: var(--c3);">
                        <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span>
                    </div>
                </div>
            </div>`,
        
        'PieChart': `
            <div class="space-y-4">
                <h3 class="text-lg font-semibold" style="color: var(--c1);">Market Share</h3>
                <div class="relative w-32 h-32 mx-auto">
                    <svg class="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--c1)" stroke-width="20" stroke-dasharray="125.6 314" stroke-dashoffset="0"/>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--c2)" stroke-width="20" stroke-dasharray="62.8 314" stroke-dashoffset="-125.6"/>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--c3)" stroke-width="20" stroke-dasharray="94.2 314" stroke-dashoffset="-188.4"/>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--c4)" stroke-width="20" stroke-dasharray="31.4 314" stroke-dashoffset="-282.6"/>
                    </svg>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <span class="text-sm font-bold" style="color: var(--c5);">100%</span>
                    </div>
                </div>
                <div class="flex flex-wrap gap-2 text-xs">
                    <div class="flex items-center space-x-1">
                        <div class="w-3 h-3 rounded-full" style="background-color: var(--c1);"></div>
                        <span style="color: var(--c3);">Product A (40%)</span>
                    </div>
                    <div class="flex items-center space-x-1">
                        <div class="w-3 h-3 rounded-full" style="background-color: var(--c2);"></div>
                        <span style="color: var(--c3);">Product B (20%)</span>
                    </div>
                </div>
            </div>`,
        
        'DataGrid': `
            <div class="space-y-3">
                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-semibold" style="color: var(--c1);">Data Grid</h3>
                    <div class="flex space-x-2">
                        <button class="px-2 py-1 text-xs rounded" style="background-color: var(--c2_alpha); color: var(--c2);">Filter</button>
                        <button class="px-2 py-1 text-xs rounded" style="background-color: var(--c3_alpha); color: var(--c3);">Sort</button>
                    </div>
                </div>
                <div class="border rounded-lg overflow-hidden">
                    <div class="grid grid-cols-4 gap-4 p-3" style="background-color: var(--c1_alpha);">
                        <div class="font-medium text-sm" style="color: var(--c1);">Name</div>
                        <div class="font-medium text-sm" style="color: var(--c2);">Status</div>
                        <div class="font-medium text-sm" style="color: var(--c3);">Progress</div>
                        <div class="font-medium text-sm" style="color: var(--c4);">Actions</div>
                    </div>
                    <div class="divide-y">
                        <div class="grid grid-cols-4 gap-4 p-3">
                            <div class="text-sm" style="color: var(--c1);">Project Alpha</div>
                            <div class="text-sm"><span class="px-2 py-1 rounded-full text-xs" style="background-color: var(--c2_alpha); color: var(--c2);">Active</span></div>
                            <div class="text-sm" style="color: var(--c3);">75%</div>
                            <div class="text-sm"><button class="px-2 py-1 text-xs rounded" style="background-color: var(--c4_alpha); color: var(--c4);">Edit</button></div>
                        </div>
                    </div>
                </div>
            </div>`,
        
        'MetricCard': `
            <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div class="p-4 rounded-lg border" style="background: linear-gradient(135deg, var(--c1_alpha), var(--c2_alpha)); border-color: var(--c1);">
                        <div class="text-2xl font-bold" style="color: var(--c1);">2,847</div>
                        <div class="text-sm" style="color: var(--c2);">Total Users</div>
                        <div class="text-xs mt-2" style="color: var(--c3);">↑ 12% from last month</div>
                    </div>
                    <div class="p-4 rounded-lg border" style="background: linear-gradient(135deg, var(--c3_alpha), var(--c4_alpha)); border-color: var(--c3);">
                        <div class="text-2xl font-bold" style="color: var(--c3);">$45.2K</div>
                        <div class="text-sm" style="color: var(--c4);">Revenue</div>
                        <div class="text-xs mt-2" style="color: var(--c5);">↑ 8% from last month</div>
                    </div>
                </div>
            </div>`,
        
        'SortableTable': `
            <div class="space-y-3">
                <h3 class="text-lg font-semibold" style="color: var(--c1);">Sortable Data Table</h3>
                <div class="border rounded-lg overflow-hidden">
                    <table class="w-full">
                        <thead style="background-color: var(--c1_alpha);">
                            <tr>
                                <th class="p-3 text-left font-semibold cursor-pointer hover:bg-opacity-20" style="color: var(--c1); background-color: var(--c2_alpha);">
                                    <div class="flex items-center space-x-1">
                                        <span>Name</span>
                                        <svg class="w-4 h-4" style="color: var(--c3);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                                        </svg>
                                    </div>
                                </th>
                                <th class="p-3 text-left font-semibold cursor-pointer hover:bg-opacity-20" style="color: var(--c2); background-color: var(--c3_alpha);">
                                    <div class="flex items-center space-x-1">
                                        <span>Status</span>
                                        <svg class="w-4 h-4" style="color: var(--c4);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                                        </svg>
                                    </div>
                                </th>
                                <th class="p-3 text-left font-semibold cursor-pointer hover:bg-opacity-20" style="color: var(--c3); background-color: var(--c4_alpha);">
                                    <div class="flex items-center space-x-1">
                                        <span>Priority</span>
                                        <svg class="w-4 h-4" style="color: var(--c5);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                                        </svg>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-t hover:bg-opacity-5" style="border-color: var(--c2); background-color: var(--c1_alpha);">
                                <td class="p-3" style="color: var(--c1);">Task Alpha</td>
                                <td class="p-3"><span class="px-2 py-1 rounded-full text-xs" style="background-color: var(--c2_alpha); color: var(--c2);">In Progress</span></td>
                                <td class="p-3"><span class="px-2 py-1 rounded-full text-xs" style="background-color: var(--c3_alpha); color: var(--c3);">High</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>`,
        
        'DragDropZone': `
            <div class="space-y-4">
                <h3 class="text-lg font-semibold" style="color: var(--c1);">Drag & Drop Zone</h3>
                <div class="border-2 border-dashed rounded-lg p-8 text-center transition-colors hover:border-solid" style="border-color: var(--c2); background-color: var(--c1_alpha);">
                    <div class="space-y-2">
                        <svg class="w-12 h-12 mx-auto" style="color: var(--c3);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <div class="text-lg font-medium" style="color: var(--c2);">Drop files here</div>
                        <div class="text-sm" style="color: var(--c4);">or click to browse</div>
                    </div>
                </div>
                <div class="flex space-x-2">
                    <div class="px-3 py-2 rounded border cursor-move" style="background-color: var(--c3_alpha); border-color: var(--c3); color: var(--c3);">Draggable Item 1</div>
                    <div class="px-3 py-2 rounded border cursor-move" style="background-color: var(--c4_alpha); border-color: var(--c4); color: var(--c4);">Draggable Item 2</div>
                </div>
            </div>`,
        
        'ResizablePanel': `
            <div class="space-y-4">
                <h3 class="text-lg font-semibold" style="color: var(--c1);">Resizable Panel</h3>
                <div class="flex space-x-2">
                    <div class="flex-1 p-4 rounded-lg border" style="background-color: var(--c2_alpha); border-color: var(--c2);">
                        <div class="text-sm font-medium" style="color: var(--c2);">Left Panel</div>
                        <div class="text-xs mt-2" style="color: var(--c3);">Resize me by dragging the handle</div>
                    </div>
                    <div class="w-1 cursor-col-resize flex items-center justify-center" style="background-color: var(--c1);">
                        <div class="w-1 h-8 rounded-full" style="background-color: var(--c4);"></div>
                    </div>
                    <div class="flex-1 p-4 rounded-lg border" style="background-color: var(--c3_alpha); border-color: var(--c3);">
                        <div class="text-sm font-medium" style="color: var(--c3);">Right Panel</div>
                        <div class="text-xs mt-2" style="color: var(--c4);">This panel adjusts automatically</div>
                    </div>
                </div>
            </div>`,
        
        'InteractiveList': `
            <div class="space-y-4">
                <h3 class="text-lg font-semibold" style="color: var(--c1);">Interactive List</h3>
                <div class="space-y-2">
                    <div class="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-opacity-10 transition-colors" style="background-color: var(--c1_alpha); border-color: var(--c2); color: var(--c1);">
                        <div class="flex items-center space-x-3">
                            <div class="w-3 h-3 rounded-full" style="background-color: var(--c2);"></div>
                            <span>List Item 1</span>
                        </div>
                        <div class="flex space-x-2">
                            <button class="p-1 rounded hover:bg-opacity-20" style="background-color: var(--c3_alpha); color: var(--c3);">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                            </button>
                            <button class="p-1 rounded hover:bg-opacity-20" style="background-color: var(--c4_alpha); color: var(--c4);">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>`,
        
        'FilterPanel': `
            <div class="space-y-4">
                <h3 class="text-lg font-semibold" style="color: var(--c1);">Advanced Filters</h3>
                <div class="space-y-3">
                    <div class="flex items-center space-x-2">
                        <label class="text-sm font-medium" style="color: var(--c2);">Category:</label>
                        <select class="px-3 py-1 rounded border text-sm" style="background-color: var(--c3_alpha); border-color: var(--c3); color: var(--c3);">
                            <option>All Categories</option>
                            <option>Design</option>
                            <option>Development</option>
                        </select>
                    </div>
                    <div class="flex items-center space-x-2">
                        <label class="text-sm font-medium" style="color: var(--c3);">Status:</label>
                        <div class="flex space-x-2">
                            <label class="flex items-center space-x-1">
                                <input type="checkbox" class="rounded" style="accent-color: var(--c4);">
                                <span class="text-sm" style="color: var(--c4);">Active</span>
                            </label>
                            <label class="flex items-center space-x-1">
                                <input type="checkbox" class="rounded" style="accent-color: var(--c5);">
                                <span class="text-sm" style="color: var(--c5);">Completed</span>
                            </label>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <label class="text-sm font-medium" style="color: var(--c4);">Date Range:</label>
                        <input type="date" class="px-3 py-1 rounded border text-sm" style="background-color: var(--c5_alpha); border-color: var(--c5); color: var(--c5);">
                    </div>
                </div>
            </div>`,
        
        'TouchSlider': `
            <div class="space-y-4">
                <h3 class="text-lg font-semibold" style="color: var(--c1);">Touch Slider</h3>
                <div class="space-y-3">
                    <div class="relative">
                        <div class="w-full h-2 rounded-full" style="background-color: var(--c2_alpha);">
                            <div class="h-2 rounded-full transition-all" style="background: linear-gradient(to right, var(--c1), var(--c2)); width: 65%;"></div>
                        </div>
                        <div class="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full cursor-pointer shadow-lg" style="background-color: var(--c3); left: 65%;"></div>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span style="color: var(--c4);">0</span>
                        <span style="color: var(--c5);">100</span>
                    </div>
                </div>
            </div>`,
        
        'SwipeCard': `
            <div class="space-y-4">
                <h3 class="text-lg font-semibold" style="color: var(--c1);">Swipeable Card</h3>
                <div class="relative w-64 h-40 mx-auto">
                    <div class="absolute inset-0 rounded-lg border transform transition-transform cursor-pointer hover:scale-105" style="background: linear-gradient(135deg, var(--c2_alpha), var(--c3_alpha)); border-color: var(--c2);">
                        <div class="p-4 h-full flex flex-col justify-between">
                            <div class="text-lg font-bold" style="color: var(--c2);">Card Title</div>
                            <div class="text-sm" style="color: var(--c3);">Swipe left or right to navigate</div>
                            <div class="flex justify-between text-xs" style="color: var(--c4);">
                                <span>← Swipe</span>
                                <span>Swipe →</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`,
        
        'MobileMenu': `
            <div class="space-y-4">
                <h3 class="text-lg font-semibold" style="color: var(--c1);">Mobile Navigation</h3>
                <div class="space-y-2">
                    <div class="flex items-center justify-between p-3 rounded-lg" style="background-color: var(--c2_alpha); color: var(--c2);">
                        <div class="flex items-center space-x-3">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                            </svg>
                            <span>Dashboard</span>
                        </div>
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </div>
                    <div class="flex items-center justify-between p-3 rounded-lg" style="background-color: var(--c3_alpha); color: var(--c3);">
                        <div class="flex items-center space-x-3">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                            </svg>
                            <span>Analytics</span>
                        </div>
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </div>
                </div>
            </div>`,
        
        'GestureIndicator': `
            <div class="space-y-4">
                <h3 class="text-lg font-semibold" style="color: var(--c1);">Touch Gestures</h3>
                <div class="grid grid-cols-2 gap-4">
                    <div class="p-4 rounded-lg border text-center" style="background-color: var(--c2_alpha); border-color: var(--c2);">
                        <div class="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center" style="background-color: var(--c2); color: white;">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <div class="text-sm font-medium" style="color: var(--c2);">Tap</div>
                    </div>
                    <div class="p-4 rounded-lg border text-center" style="background-color: var(--c3_alpha); border-color: var(--c3);">
                        <div class="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center" style="background-color: var(--c3); color: white;">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                            </svg>
                        </div>
                        <div class="text-sm font-medium" style="color: var(--c3);">Swipe</div>
                    </div>
                </div>
            </div>`,
        
        'FocusTrap': `
            <div class="space-y-4">
                <h3 class="text-lg font-semibold" style="color: var(--c1);">Focus Management</h3>
                <div class="space-y-3">
                    <button class="w-full p-3 rounded-lg border text-left transition-all focus:ring-2 focus:ring-offset-2" style="background-color: var(--c2_alpha); border-color: var(--c2); color: var(--c2); focus:ring-color: var(--c3);">
                        <div class="font-medium">Focusable Item 1</div>
                        <div class="text-sm mt-1" style="color: var(--c3);">Tab to navigate between items</div>
                    </button>
                    <button class="w-full p-3 rounded-lg border text-left transition-all focus:ring-2 focus:ring-offset-2" style="background-color: var(--c3_alpha); border-color: var(--c3); color: var(--c3); focus:ring-color: var(--c4);">
                        <div class="font-medium">Focusable Item 2</div>
                        <div class="text-sm mt-1" style="color: var(--c4);">Use arrow keys to navigate</div>
                    </button>
                </div>
            </div>`,
        
        'KeyboardShortcuts': `
            <div class="space-y-4">
                <h3 class="text-lg font-semibold" style="color: var(--c1);">Keyboard Shortcuts</h3>
                <div class="space-y-2">
                    <div class="flex items-center justify-between p-2 rounded" style="background-color: var(--c2_alpha); color: var(--c2);">
                        <span class="text-sm">Save</span>
                        <kbd class="px-2 py-1 text-xs rounded" style="background-color: var(--c3_alpha); color: var(--c3);">Ctrl+S</kbd>
                    </div>
                    <div class="flex items-center justify-between p-2 rounded" style="background-color: var(--c3_alpha); color: var(--c3);">
                        <span class="text-sm">Undo</span>
                        <kbd class="px-2 py-1 text-xs rounded" style="background-color: var(--c4_alpha); color: var(--c4);">Ctrl+Z</kbd>
                    </div>
                    <div class="flex items-center justify-between p-2 rounded" style="background-color: var(--c4_alpha); color: var(--c4);">
                        <span class="text-sm">Search</span>
                        <kbd class="px-2 py-1 text-xs rounded" style="background-color: var(--c5_alpha); color: var(--c5);">Ctrl+F</kbd>
                    </div>
                </div>
            </div>`,
        
        'ScreenReaderHelper': `
            <div class="space-y-4">
                <h3 class="text-lg font-semibold" style="color: var(--c1);">Screen Reader Support</h3>
                <div class="space-y-3">
                    <div class="p-3 rounded-lg border" style="background-color: var(--c2_alpha); border-color: var(--c2);">
                        <div class="flex items-center space-x-2">
                            <div class="w-4 h-4 rounded-full" style="background-color: var(--c3);"></div>
                            <span class="text-sm font-medium" style="color: var(--c2);">Status Indicator</span>
                        </div>
                        <div class="text-xs mt-1" style="color: var(--c3);" aria-label="Current status: Online">Online</div>
                    </div>
                    <div class="p-3 rounded-lg border" style="background-color: var(--c3_alpha); border-color: var(--c3);">
                        <div class="text-sm font-medium" style="color: var(--c3);">Progress Bar</div>
                        <div class="w-full h-2 rounded-full mt-2" style="background-color: var(--c4_alpha);">
                            <div class="h-2 rounded-full transition-all" style="background-color: var(--c4); width: 75%;" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div class="text-xs mt-1" style="color: var(--c4);">75% Complete</div>
                    </div>
                </div>
            </div>`,
        
        'HighContrastMode': `
            <div class="space-y-4">
                <h3 class="text-lg font-semibold" style="color: var(--c1);">High Contrast Mode</h3>
                <div class="space-y-3">
                    <div class="p-3 rounded-lg border-2" style="background-color: var(--c2); border-color: var(--c1); color: var(--c1);">
                        <div class="font-bold">High Contrast Text</div>
                        <div class="text-sm mt-1">This text has maximum contrast for accessibility</div>
                    </div>
                    <div class="p-3 rounded-lg border-2" style="background-color: var(--c3); border-color: var(--c4); color: var(--c4);">
                        <div class="font-bold">Alternative Contrast</div>
                        <div class="text-sm mt-1">Different color combination for variety</div>
                    </div>
                </div>
            </div>`,
        
        'CodeSnippet': `
            <div class="space-y-4">
                <h3 class="text-lg font-semibold" style="color: var(--c1);">Code Snippet</h3>
                <div class="p-4 rounded-lg border font-mono text-sm" style="background-color: var(--c2); border-color: var(--c3); color: var(--c3);">
                    <div class="mb-2 text-xs font-medium" style="color: var(--c4);">JavaScript</div>
                    <pre><code><span style="color: var(--c1);">function</span> <span style="color: var(--c5);">createPalette</span>() {
  <span style="color: var(--c2);">const</span> colors = [<span style="color: var(--c3);">'#ff0000'</span>, <span style="color: var(--c4);">'#00ff00'</span>];
  <span style="color: var(--c1);">return</span> colors;
}</code></pre>
                </div>
            </div>`,
        
        'ComponentPlayground': `
            <div class="space-y-4">
                <h3 class="text-lg font-semibold" style="color: var(--c1);">Component Playground</h3>
                <div class="p-4 rounded-lg border" style="background-color: var(--c2_alpha); border-color: var(--c2);">
                    <div class="text-sm mb-3" style="color: var(--c2);">Interactive testing area for components</div>
                    <div class="grid grid-cols-2 gap-2">
                        <button class="px-3 py-2 rounded text-sm" style="background-color: var(--c3_alpha); color: var(--c3);">Test Button</button>
                        <button class="px-3 py-2 rounded text-sm" style="background-color: var(--c4_alpha); color: var(--c4);">Reset</button>
                    </div>
                    <div class="text-xs mt-3" style="color: var(--c5);">Use this area to test component behavior</div>
                </div>
            </div>`,

    // Professional 8-Color Showcase Component
    ColorSpectrumShowcase: `
        <div class="p-6 border rounded-lg" style="border-color: var(--c2); background: var(--c5);">
            <h4 class="font-bold mb-4" style="color: var(--c1);">Complete Color Spectrum</h4>
            <div class="space-y-4">
                <!-- Primary Color Row -->
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-full border-2 border-white shadow-sm" style="background: var(--c1);"></div>
                    <div class="flex-1">
                        <div class="text-sm font-medium" style="color: var(--c1);">Primary Brand</div>
                        <div class="text-xs text-secondary">Main brand color for headers and primary actions</div>
                    </div>
                </div>
                <!-- Secondary Color Row -->
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-full border-2 border-white shadow-sm" style="background: var(--c2);"></div>
                    <div class="flex-1">
                        <div class="text-sm font-medium" style="color: var(--c2);">Secondary Accent</div>
                        <div class="text-xs text-secondary">Supporting color for buttons and highlights</div>
                    </div>
                </div>
                <!-- Tertiary Color Row -->
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-full border-2 border-white shadow-sm" style="background: var(--c3);"></div>
                    <div class="flex-1">
                        <div class="text-sm font-medium" style="color: var(--c3);">Tertiary Element</div>
                        <div class="text-xs text-secondary">Additional UI elements and borders</div>
                    </div>
                </div>
                <!-- Quaternary Color Row -->
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-full border-2 border-white shadow-sm" style="background: var(--c4);"></div>
                    <div class="flex-1">
                        <div class="text-sm font-medium" style="color: var(--c4);">Quaternary Detail</div>
                        <div class="text-xs text-secondary">Subtle details and decorative elements</div>
                    </div>
                </div>
                <!-- Quinary Color Row -->
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-full border-2 border-white shadow-sm" style="background: var(--c5);"></div>
                    <div class="flex-1">
                        <div class="text-sm font-medium" style="color: var(--c5);">Background Base</div>
                        <div class="text-xs text-secondary">Main background and neutral elements</div>
                    </div>
                </div>
                <!-- Senary Color Row -->
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-full border-2 border-white shadow-sm" style="background: var(--c6);"></div>
                    <div class="flex-1">
                        <div class="text-sm font-medium" style="color: var(--c6);">Senary Accent</div>
                        <div class="text-xs text-secondary">Extended palette for complex designs</div>
                    </div>
                </div>
                <!-- Septenary Color Row -->
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-full border-2 border-white shadow-sm" style="background: var(--c7);"></div>
                    <div class="flex-1">
                        <div class="text-sm font-medium" style="color: var(--c7);">Septenary Detail</div>
                        <div class="text-xs text-secondary">Advanced color for sophisticated layouts</div>
                    </div>
                </div>
                <!-- Octonary Color Row -->
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-full border-2 border-white shadow-sm" style="background: var(--c8);"></div>
                    <div class="flex-1">
                        <div class="text-sm font-medium" style="color: var(--c8);">Octonary Finish</div>
                        <div class="text-xs text-secondary">Final color for complete palette coverage</div>
                    </div>
                </div>
            </div>
            <div class="mt-4 p-3 rounded" style="background: linear-gradient(135deg, var(--c1_alpha), var(--c2_alpha), var(--c3_alpha), var(--c4_alpha), var(--c5_alpha), var(--c6_alpha), var(--c7_alpha), var(--c8_alpha));">
                <div class="text-xs font-medium" style="color: var(--c1);">Professional Color Distribution</div>
                <div class="text-xs text-secondary">All 8 colors working together harmoniously</div>
            </div>
        </div>`
};

function renderShowcase(selectedComponents, showcaseSection) {
    showcaseSection.innerHTML = '';
    if (selectedComponents.length === 0) {
        showcaseSection.innerHTML = `
            <div class="flex flex-col items-center justify-center py-16 text-center">
                <div class="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                    <svg class="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-primary mb-2">No Components Selected</h3>
                <p class="text-secondary max-w-md">Select components from the panel to see how your color palette will be applied to different UI elements.</p>
            </div>`;
        return;
    }
    // Component categories for organized layout
    const componentCategories = {
        'Navigation': ['Navbar', 'Sidebar', 'Breadcrumbs', 'Pagination', 'Tabs', 'Menu', 'Drawer', 'AppBar', 'ColorfulSidebar'],
        'Interactive': ['Buttons', 'Forms', 'InputGroup', 'NumberInput', 'ColorPicker', 'Switch', 'Slider', 'MultiSelect', 'DateRangePicker', 'RichTextEditor'],
        'Data Display': ['Table', 'DataTable', 'ListGroup', 'Timeline', 'Stats', 'Dashboard', 'Analytics', 'GanttChart', 'Heatmap', 'ColorfulTimeline'],
        'Data Visualization': ['BarChart', 'LineChart', 'PieChart', 'DataGrid', 'MetricCard'],
        'Advanced Interactions': ['SortableTable', 'DragDropZone', 'ResizablePanel', 'InteractiveList', 'FilterPanel'],
        'Mobile & Touch': ['TouchSlider', 'SwipeCard', 'MobileMenu', 'GestureIndicator'],
        'Accessibility & UX': ['FocusTrap', 'KeyboardShortcuts', 'ScreenReaderHelper', 'HighContrastMode'],
        'Development Tools': ['CodeSnippet', 'ComponentPlayground'],
        'Feedback': ['Alerts', 'Notification', 'Toast', 'Callout', 'EmptyState', 'SkeletonLoader', 'Progress', 'StepProgressBar', 'NotificationBanner', 'StatusIndicators'],
        'Preloaders': ['LoadingSpinner', 'ProgressBar', 'SkeletonLoader', 'LoadingDots', 'LoadingPulse', 'LoadingRing', 'LoadingWave', 'LoadingCard', 'LoadingTable', 'LoadingOrbit', 'LoadingHexagon', 'LoadingStairs', 'LoadingMorph', 'LoadingRipple', 'LoadingSpiral', 'LoadingMatrix', 'LoadingFractal', 'LoadingNeon', 'LoadingGradient'],
        'Content': ['Card', 'Accordion', 'Collapse', 'Modal', 'Badge', 'Chip', 'Divider', 'CodeBlock', 'ColorfulTags'],
        'Media': ['Avatar', 'AvatarGroup', 'ImageGallery', 'VideoPlayer', 'Carousel', 'MediaObject'],
        'Communication': ['ChatBubble', 'Feedback', 'RatingStars', 'CTASection'],
        'User Interface': ['Profile', 'Settings', 'Notifications', 'Help', 'Onboarding', 'FileUploader', 'FileTree', 'KanbanBoard', 'Calendar', 'Search'],
        'Palette Visualizations': ['PaletteButtonGroup', 'PaletteCardDeck', 'ColorSchemeGenerator', 'ColorHarmonyVisualizer', 'ColorContrastMatrix', 'ColorfulCharts']
    };
    // Create organized layout with full-size components
    const createCategorySection = (categoryName, components) => {
        const categoryComponents = components.filter(comp => selectedComponents.includes(comp));
        if (categoryComponents.length === 0) return '';
        return `
            <div class="category-section mb-16">
                <div class="flex items-center mb-8">
                    <div class="w-1 h-8 rounded-full mr-4" style="background-color: var(--c1)"></div>
                    <h2 class="text-2xl font-bold text-primary">${categoryName}</h2>
                    <div class="flex-1 h-px ml-6" style="background: linear-gradient(to right, var(--c1_alpha), transparent)"></div>
                </div>
                <div class="components-container space-y-8">
                    ${categoryComponents.map(componentName => {
                        const componentHTML = uiComponents[componentName];
                        if (!componentHTML) return '';
                        return `
                            <div class="component-preview-container">
                                <div class="flex items-center justify-between mb-4">
                                    <h3 class="text-lg font-semibold text-primary capitalize">${componentName.replace(/([A-Z])/g, ' $1').trim()}</h3>
                                </div>
                                <div class="component-preview-frame p-6 border border-color rounded-xl bg-secondary/30 backdrop-blur-sm soft-shadow" style="border-radius: 12px !important;">
                                    ${componentHTML}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    };
    // Generate the organized layout
    let organizedLayout = '';
    // Add components that don't fit into categories
    const categorizedComponents = Object.values(componentCategories).flat();
    const uncategorizedComponents = selectedComponents.filter(comp => !categorizedComponents.includes(comp));
    // Render categorized components
    Object.entries(componentCategories).forEach(([categoryName, components]) => {
        organizedLayout += createCategorySection(categoryName, components);
    });
    // Render uncategorized components if any
    if (uncategorizedComponents.length > 0) {
        organizedLayout += createCategorySection('Other', uncategorizedComponents);
    }
    // Apply the organized layout
    showcaseSection.innerHTML = `
        <div class="showcase-container">
            <div class="mb-8">
                <div class="flex items-center justify-between">
                    <h1 class="text-3xl font-bold text-primary">Component Showcase</h1>
                    <div class="flex items-center space-x-3">
                        <span class="text-sm text-secondary">${selectedComponents.length} component${selectedComponents.length !== 1 ? 's' : ''} selected</span>
                        <div class="w-3 h-3 rounded-full" style="background-color: var(--c1)"></div>
                    </div>
                </div>
                <p class="text-secondary mt-3 text-lg">Preview how your color palette applies to different UI components at full size</p>
            </div>
            <div class="showcase-content">
                ${organizedLayout}
            </div>
        </div>
    `;
    // Add responsive behavior and smooth animations
    const componentFrames = showcaseSection.querySelectorAll('.component-preview-frame');
    componentFrames.forEach((frame, index) => {
        frame.style.animationDelay = `${index * 0.1}s`;
        frame.classList.add('animate-fade-in');
    });
}

export { renderShowcase };