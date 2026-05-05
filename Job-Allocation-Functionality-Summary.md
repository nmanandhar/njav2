# JOB ALLOCATION FUNCTIONALITY SUMMARY
## NJA Business Operations System

**Document Date:** December 2024  
**Portals Covered:** Head Office Portal, Client Portal, Subcontractor Portal

---

## TABLE OF CONTENTS

1. [Head Office Portal (Admin Portal)](#1-head-office-portal-admin-portal)
2. [Client Portal](#2-client-portal)
3. [Subcontractor Portal](#3-subcontractor-portal)
4. [Key Allocation Models & Systems](#key-allocation-models--systems)
5. [Functionality Comparison Table](#functionality-comparison-table)
6. [Workflow Summary](#workflow-summary)

---

## 1. HEAD OFFICE PORTAL (Admin Portal)

**Base URL:** `/admin-portal`

### Core Job Allocation Features

#### A. Job Creation & Management
**Location:** `/admin-portal/jobs/new`

**Features:**
- **Multi-truck assignment** to single jobs (up to 10+ trucks per job)
- **Client selection** with automatic address population
- **Tip Client management** for designated tipping locations
- **Material/Product selection:**
  - Concrete Mix
  - VENM (Virgin Excavated Natural Material)
  - Gravel
  - Sand
  - Hydraulic Oil
- **Quantity tracking** with unit selection (Tonnes, Volume m³)
- **Priority levels:** High, Normal, Low
- **Rate configuration:**
  - **Client Rate** (Per Tonne/Hourly/Per Load)
  - **Subcontractor Rate** (Hourly/Per Tonne/Per Load)
  - **Tip Rate** (typically Per Load)

#### B. Truck/Vehicle Assignment System

**Vehicle Categories:**
- **Internal Fleet vehicles:**
  - GHI-789, DEF-456, ABC-123, POR-567, MNO-234
  - Company-owned trucks (FL-001 to FL-005)
- **Subcontractor vehicles:**
  - SUB-001, SUB-002, SUB-003, SUB-004, JKL-890
  - Partner company trucks (SC-001 to SC-004)

**Vehicle Details Tracked:**
- Registration number
- Make/Model (Volvo FH16, Scania R450, Mercedes Actros, DAF XF, Isuzu FVZ)
- Driver assignment
- Vehicle status with color indicators
- Company/Subcontractor association

**Assignment Capabilities:**
- **Add/Remove trucks** from jobs dynamically
- **Status indicators:** 
  - Active (green dot)
  - Warning (amber dot)
  - Alert (red dot)
- **Visual truck grouping** by status colors in job cards

#### C. Job Management Table
**Location:** `/admin-portal/jobs`

**Job Card Display Includes:**
- **Identification:**
  - Job Number (JOB-2024-001, etc.)
  - Client Name
  - Client PO# (Purchase Order Number)
- **Locations:**
  - Pickup Address (full street address with suburb/state/postcode)
  - Tip Client name
  - Tip Address (destination address)
- **Rates Section:**
  - Client Rate (amount + unit)
  - Subcontractor Rate (amount + unit)
  - Tip Rate (amount + unit)
- **Trucks Section:**
  - All assigned truck registrations
  - Grouped by status colors (green, amber, red)
  - Internal vs. Subcontractor badges
  - Multiple columns when 10+ trucks assigned
- **Timeline:**
  - Entry Date/Time (DD/MM/YYYY HH:MM format)
  - Delivery Date/Time (DD/MM/YYYY HH:MM format)
- **Status & Actions:**
  - Job Status dropdown (New=Blue, In Progress=Amber, Completed=Green)
  - Despatch Notice "Manage" button
- **Additional Info:**
  - Material type and quantity
  - Driver assignments with avatars
  - Photo count (3 photos)
  - Docket count (2 dockets)

#### D. Job Status Management

**Status Options:**
- **New** - Blue badge, newly created jobs
- **In Progress** - Amber badge, active jobs
- **Pending** - Grey badge, jobs awaiting action
- **Completed** - Green badge, finished jobs

**Status Capabilities:**
- Color-coded visual indicators
- Dropdown selection for status changes
- Job lifecycle tracking from creation to completion
- Filter by status in job list

#### E. Allocator Management
**Location:** `/admin-portal/fleet/allocators`

**Purpose:** Track job allocation staff performance and availability

**Allocator Information:**
- **Personal Details:**
  - Name with avatar
  - Employee ID (AL-001, AL-002, etc.)
  - Department (Operations, Logistics, Fleet)
  - Contact information (email, phone)
  
- **Status Tracking:**
  - Active - Currently working
  - On Break - Temporarily unavailable
  - Off Duty - Not working
  - Last active timestamp
  
- **Performance Metrics:**
  - Active jobs count (currently managing)
  - Completed today count (daily productivity)
  - Efficiency percentage (88-95% range)
  - Jobs per hour average
  
- **Rate Tracking:**
  - Hourly Weekday ($52-$60/hr)
  - Hourly Weekend ($65-$72/hr)
  - Night Weekday ($62-$70/hr)
  - Night Weekend ($72-$80/hr)

**Allocator Statistics Dashboard:**
- Total allocators count
- Currently active allocators
- Average efficiency across team
- Total jobs allocated today

#### F. Advanced Features

**Three-Tier Location Model:**
- **Stage Point** - Loading or staging area designation
- **Drop Site** - Primary delivery/unloading area
- **Tip Site** - Disposal or tipping location

**Job Management:**
- Pre-start checklist management
- Estimated vs. Actual duration tracking
- Invoice number generation upon job completion
- Photo uploads (up to 3 per job)
- Docket uploads (up to 2 per job)
- Job notes and special instructions
- Export job data to CSV/Excel
- Import job data from templates

**Search & Filter:**
- Search by Job Number, Client, Driver, Location, Material
- Filter by Status, Priority, Driver Type
- Sort by Entry Date, Delivery Date, Job Number

---

## 2. CLIENT PORTAL

**Base URL:** `/dashboard`

### Job Allocation Features

#### A. Job Creation
**Location:** `/dashboard/jobs/new`

**Client Can Specify:**
- **Client information** (pre-filled from profile)
- **Pickup location** selection from address book
- **Delivery location** selection from address book
- **Material type & quantity:**
  - Material dropdown (Concrete Mix, VENM, Gravel, Sand, Hydraulic Oil)
  - Quantity field with unit selector
- **Priority assignment:** High, Normal, Low
- **Scheduled date & time** selection
- **Optional locations:**
  - Stage Point selection
  - Drop Site selection
  - Tip Site selection
- **Job notes** and special instructions
- **Rate visibility** (can view configured rates)

**Submission Process:**
- Form validation
- Automatic Job Number generation by system
- Notification to Head Office for truck assignment
- Email confirmation to client

#### B. Job Viewing & Management
**Location:** `/dashboard/jobs`

**Jobs Table Display:**
- **Job Information:**
  - Job Number with creation date
  - Status badge (color-coded)
  - Material type and location
  
- **Driver & Vehicle:**
  - Driver name with avatar
  - Driver type badge (Internal/Subcontractor)
  - Truck allocation information (view only)
  
- **Documents:**
  - Photo count with ability to view/upload
  - Docket count with ability to view/upload
  
- **Financial:**
  - Invoice number (generated by Head Office)
  - Invoice status tracking

**Search & Filter:**
- **Search by:**
  - Job Number
  - Driver Name
  - Location
  - Material Type
  
- **Filter options:**
  - Status: Completed, In Progress, Pending
  - Driver Type: Internal, Subcontractor
  - Date range

#### C. Job Editing
**Location:** `/dashboard/jobs/[id]/edit`

**Editable Fields:**
- **Driver assignment** (limited capability)
- **Location updates:**
  - Pickup location from address book
  - Delivery location from address book
  - Sub-location management (Stage Point, Drop Site, Tip Site)
- **Material & quantity** modifications
- **Status updates** (limited)
- **Priority adjustments**
- **Schedule changes** (subject to approval)
- **Notes management** (add/edit job notes)

**Restrictions:**
- Cannot assign multiple trucks (Head Office function)
- Cannot modify rates
- Cannot change allocator assignments
- Cannot delete jobs (must request cancellation)

#### D. Address Book Integration
**Location:** `/dashboard/jobs/address-book`

**Address Book Management:**

**Pickup Locations:**
- Company yards and depots
- Supplier locations
- Material source points
- Sub-location designation:
  - Stage Point (loading area)
  - Drop Site (staging area)
  - Tip Site (disposal area)

**Delivery Locations:**
- Construction sites
- Project sites
- Multiple delivery zones per site
- Building/Floor specifications
- Access instructions

**Contact Information Per Location:**
- Contact Person name
- Phone number
- Email address
- Alternative contacts
- Access hours/restrictions

**Address Book Features:**
- Add new locations
- Edit existing locations
- Set default pickup/delivery addresses
- Share addresses with Head Office
- Quick selection during job creation

#### E. Job Details View
**Location:** `/dashboard/jobs/[id]`

**Comprehensive Job Information:**

**Timeline Tracking:**
1. Job created (timestamp)
2. Driver assigned (timestamp, driver name)
3. Material loaded (timestamp, location)
4. En route to site (timestamp, ETA)
5. Arrived at site (timestamp)
6. Delivery in progress (timestamp)
7. Delivery completed (timestamp, signature)

**Driver Information:**
- Full name
- Contact number
- Driver type (Internal/Subcontractor)
- Vehicle details
- Current status

**Vehicle Details:**
- Truck ID/Registration
- Make and Model
- Capacity
- Current location (GPS tracking)

**Material Specifications:**
- Material type
- Quantity ordered
- Quantity delivered
- Unit of measurement
- Batch numbers (if applicable)

**Photo Gallery:**
- Site arrival photos
- Material loading photos
- Delivery progress photos
- Completion photos
- Photo captions and timestamps

**Document Management:**
- Delivery Dockets (PDF format)
- Material Certificates (PDF format)
- Weighbridge tickets (PDF format)
- File sizes and upload dates
- Download capability

#### F. Key Restrictions

**Cannot Do:**
- ❌ Assign multiple trucks (Head Office function only)
- ❌ Modify allocator assignments
- ❌ Change rate structures
- ❌ Delete completed jobs
- ❌ Access other clients' jobs
- ❌ Generate invoices
- ❌ Manage subcontractor details

**Can Do:**
- ✅ View all own job details
- ✅ Edit own pending jobs
- ✅ Upload photos and dockets
- ✅ Track invoice status
- ✅ Manage address book
- ✅ Create new job requests
- ✅ Add job notes and comments
- ✅ Export own job data

---

## 3. SUBCONTRACTOR PORTAL

**Base URL:** `/subcontractor-dashboard`

### Job Allocation Features

#### A. Job Viewing
**Location:** `/subcontractor-dashboard/jobs`

**Jobs Table Display:**
- **Job Identification:**
  - Job Number
  - Creation date
  - Status badge
  
- **Assignment Details:**
  - Driver name (from subcontractor company)
  - Truck allocation (assigned by Head Office)
  - Internal driver identifier
  
- **Job Information:**
  - Location details (pickup and delivery)
  - Material type
  - Quantity
  
- **Status & Documents:**
  - Status badges (view only)
  - Photo count (view access)
  - Docket count (view access)
  - Invoice number (view only)

**Filter & Search:**
- **Filter options:**
  - Status (Completed, In Progress, Pending)
  - Driver Type filter
  - Date range
  
- **Search capability:**
  - Job Number
  - Driver name
  - Location
  - Material type

#### B. Job Details View
**Location:** `/subcontractor-dashboard/jobs/[id]`

**Read-Only Information Display:**

**Job Header:**
- Job Number
- Status badge
- Creation date

**Assignment Information:**
- Driver name (e.g., Tom Brown)
- Driver company affiliation
- Truck allocation (e.g., TRUCK-SC-001)
- Vehicle details

**Job Specifications:**
- Pickup location with full address
- Delivery location with full address
- Material type
- Quantity and unit

**Documents & Media:**
- Photo count (e.g., 2 photos)
- Docket count (e.g., 1 docket)
- "View Files" button for access
- Download capability

**Navigation:**
- "Back to Jobs" button
- No edit capabilities
- View-only mode throughout

#### C. Statistics Dashboard

**Subcontractor Performance Metrics:**
- **Active Jobs:** Count of currently assigned jobs
- **Pending Jobs:** Jobs awaiting start or completion
- **Completed Jobs:** Total finished jobs count
- **This Month:** Monthly job completion count
- **Performance rating:** Overall score (view only)

**Visual Indicators:**
- Job count badges
- Status distribution charts
- Monthly trends (read-only)

#### D. Key Restrictions

**Cannot Perform:**
- ❌ **Create** new jobs
- ❌ **Modify** truck assignments
- ❌ **Change** driver assignments
- ❌ **Edit** job details (location, material, quantity)
- ❌ **Configure** rates or pricing
- ❌ **Export** system data
- ❌ **Access** other subcontractors' jobs
- ❌ **Delete** or cancel jobs
- ❌ **Upload** new files (limited upload access)
- ❌ **Generate** invoices
- ❌ **Modify** job status

**Can Perform:**
- ✅ **View** all assigned job details
- ✅ **View** files (photos, dockets, certificates)
- ✅ **Track** invoice status for payment
- ✅ **See** job timeline and progress
- ✅ **Access** driver contact information
- ✅ **View** performance statistics
- ✅ **Monitor** active and pending jobs

---

## KEY ALLOCATION MODELS & SYSTEMS

### 1. Three-Tier Location Model

```
Main Location (Company/Site)
  │
  ├─ Stage Point
  │    └─ Loading or staging area for materials
  │
  ├─ Drop Site
  │    └─ Primary delivery/unloading area
  │
  └─ Tip Site
       └─ Disposal or tipping location
```

**Example Usage:**
- **Pickup Location:** Sydney Metro Construction (Main)
  - **Stage Point:** 123 George St, Sydney NSW 2000 (Loading area)
  
- **Delivery Location:** Coastal Transport Co (Main)
  - **Drop Site:** 78 Beach Road, Wollongong NSW 2500 (Unloading)
  - **Tip Site:** Waste Management Facility (Disposal)

### 2. Vehicle Assignment Model

**Internal Fleet:**
- Company-owned trucks (FL-001 to FL-005)
- Registrations: GHI-789, DEF-456, ABC-123, POR-567, MNO-234
- Full control and management
- Direct driver employees

**Subcontractor Fleet:**
- Partner company trucks (SC-001 to SC-004)
- Registrations: SUB-001, SUB-002, SUB-003, SUB-004, JKL-890
- External management
- Subcontractor drivers

**Multi-Truck Jobs:**
- Up to 10+ trucks per single job
- Mixed internal and subcontractor vehicles
- Visual grouping by status
- Displayed in multiple columns for readability

**Status Tracking:**
- **Active (Green):** Truck operational and on task
- **Warning (Amber):** Minor issue or delay
- **Alert (Red):** Critical issue requiring attention

### 3. Rate Structure

**Client Rate:**
- What the client pays
- Typical units: Per Tonne, Hourly, Per Load
- Example: $140 Per Tonne, $870 Per Load

**Subcontractor Rate:**
- What subcontractor charges NJA
- Typical units: Hourly, Per Tonne, Per Load
- Example: $140 Hourly, $130 Hourly

**Tip Rate:**
- Tipping/disposal fee
- Typical unit: Per Load
- Example: $870 Per Load, $850 Per Load

**Rate Units Available:**
- **Hourly:** Time-based billing ($/hour)
- **Per Tonne:** Weight-based billing ($/tonne)
- **Load Rate:** Per delivery charge ($/load)

### 4. Job Status Lifecycle

```
New (Blue)
    ↓
In Progress (Amber) ←→ Pending (Grey - for issues)
    ↓
Completed (Green)
```

**Status Definitions:**
- **New:** Freshly created, awaiting truck/driver assignment
- **In Progress:** Active job with assigned resources
- **Pending:** Temporarily held due to issues or delays
- **Completed:** Successfully finished with all deliveries done

### 5. Driver Assignment Types

**Internal Drivers:**
- Direct company employees
- Full benefits and insurance
- Company uniforms and equipment
- Guaranteed availability
- Avatar display with initials
- "Internal" badge (green)

**Subcontractor Drivers:**
- External contractor employees
- Managed by subcontractor company
- Own equipment and vehicles
- Availability depends on subcontractor
- Avatar display with initials
- "Subcontractor" badge (amber)

**Display Format:**
- Circular avatar with driver initials
- Driver full name
- Type badge (Internal/Subcontractor)
- Contact information on hover

---

## FUNCTIONALITY COMPARISON TABLE

| Feature | Admin Portal | Client Portal | Subcontractor Portal |
|---------|--------------|---------------|----------------------|
| **Create Jobs** | ✅ Full | ✅ Full | ❌ None |
| **Assign Multiple Trucks** | ✅ Yes (10+) | ❌ No | ❌ No |
| **Assign Drivers** | ✅ Full control | ⚠️ Limited | ❌ No |
| **Edit Jobs** | ✅ All jobs | ✅ Own jobs only | ❌ None |
| **View Job Details** | ✅ All jobs | ✅ Own jobs | ✅ Assigned jobs only |
| **Manage Allocators** | ✅ Yes | ❌ No | ❌ No |
| **Configure Rates** | ✅ Yes | ✅ View only | ❌ None |
| **Track Efficiency** | ✅ Yes (88-95%) | ❌ No | ❌ No |
| **Export Data** | ✅ CSV/Excel | ❌ No | ❌ No |
| **Upload Files** | ✅ Photos/Dockets | ✅ Photos/Dockets | ⚠️ Limited |
| **Manage Address Book** | ✅ Full access | ✅ Own addresses | ⚠️ View only |
| **Invoice Tracking** | ✅ Generate | ✅ View | ✅ View |
| **Despatch Notice** | ✅ Manage | ❌ No | ❌ No |
| **Status Changes** | ✅ All statuses | ⚠️ Limited | ❌ View only |
| **Delete Jobs** | ✅ Yes | ❌ Request only | ❌ No |
| **Access All Jobs** | ✅ System-wide | ❌ Own only | ❌ Assigned only |
| **Modify Allocations** | ✅ Yes | ❌ No | ❌ No |
| **View Performance** | ✅ All metrics | ❌ No | ⚠️ Own only |

**Legend:**
- ✅ Full capability
- ⚠️ Limited or restricted capability
- ❌ No capability

---

## WORKFLOW SUMMARY

### Typical Job Allocation Flow

**Step 1: Job Creation (Head Office)**
- Admin creates new job in system
- Selects client from database
- Specifies material type and quantity
- Sets pickup and delivery locations
- Configures Stage Point, Drop Site, Tip Site
- Defines entry and delivery date/times
- Sets priority level (High/Normal/Low)
- Configures three rate types (Client, Subcontractor, Tip)

**Step 2: Truck Assignment (Head Office)**
- Admin assigns multiple trucks to job (10+ if needed)
- Selects mix of internal and subcontractor vehicles
- Adds truck registrations individually
- Visual grouping by status colors
- Trucks displayed across multiple columns

**Step 3: Driver Assignment (Head Office)**
- Admin assigns drivers to each vehicle
- Selects from internal driver pool
- Or assigns subcontractor drivers
- Driver details automatically linked to truck

**Step 4: Job Visibility (Client Portal)**
- Client receives job creation notification
- Can view complete job details
- Sees assigned trucks and drivers
- Tracks job progress through timeline
- Can upload supporting photos/dockets

**Step 5: Subcontractor Notification**
- Subcontractor receives assignment notification
- Views job details in subcontractor portal
- Sees which drivers are assigned
- Accesses pickup/delivery information
- Reviews material specifications

**Step 6: Real-Time Tracking (All Portals)**
- Job status updates visible to all parties
- Timeline events tracked and displayed
- Photo/docket uploads shared across portals
- Status changes reflected immediately

**Step 7: Allocator Management (Head Office)**
- Allocators monitor active jobs
- Track efficiency metrics (88-95%)
- Manage multiple simultaneous allocations
- Performance measured per allocator

**Step 8: Job Completion (Head Office)**
- Admin marks job as completed
- System generates invoice number
- Final photos and dockets uploaded
- Completion timestamp recorded
- All parties notified

**Step 9: Invoice Processing**
- Invoice generated by Head Office
- Visible to Client Portal for payment
- Visible to Subcontractor Portal for tracking
- Payment status updated in system

---

## DATA POINTS TRACKED

### Job-Level Data
- Job Number (unique identifier)
- Client PO# (Purchase Order Number)
- Client Name and Contact
- Material Type and Specifications
- Quantity Ordered and Delivered
- Priority Level (High/Normal/Low)
- Status (New/In Progress/Pending/Completed)

### Location Data
- Pickup Address (full address with coordinates)
- Delivery Address (full address with coordinates)
- Stage Point (sub-location)
- Drop Site (sub-location)
- Tip Site (sub-location)
- Access instructions for each location
- Contact persons at each location

### Scheduling Data
- Entry Date/Time (DD/MM/YYYY HH:MM)
- Delivery Date/Time (DD/MM/YYYY HH:MM)
- Estimated Duration
- Actual Duration
- Time variances

### Vehicle Data
- Truck Registrations (all assigned vehicles)
- Internal vs. Subcontractor designation
- Vehicle Make and Model
- Vehicle Capacity
- Status indicators (Active/Warning/Alert)
- Current location (GPS tracking)

### Driver Data
- Driver Full Name
- Driver Type (Internal/Subcontractor)
- Contact Information
- Company Affiliation (for subcontractors)
- Driver Assignment per vehicle

### Rate Data
- Client Rate (amount + unit)
- Subcontractor Rate (amount + unit)
- Tip Rate (amount + unit)
- Total job value calculation

### Document Data
- Photos uploaded (up to 3 per job)
- Dockets uploaded (up to 2 per job)
- Photo captions and timestamps
- Document file sizes
- Material certificates (PDF)
- Weighbridge tickets (PDF)

### Allocator Data
- Allocator Name and ID
- Department (Operations/Logistics/Fleet)
- Current Status (Active/On Break/Off Duty)
- Active Jobs Count
- Completed Today Count
- Efficiency Percentage (88-95%)
- Last Active Timestamp
- Hourly Rate Structures (Weekday/Weekend/Night)

### Performance Metrics
- Jobs per hour per allocator
- Average efficiency across team
- Job completion rates
- Driver performance tracking
- Vehicle utilization rates
- Client satisfaction scores

### Invoice Data
- Invoice Number (auto-generated)
- Invoice Status (Pending/Paid)
- Invoice Generation Date
- Payment Due Date
- Payment Received Date

### Timeline Events
1. Job Created (timestamp)
2. Trucks Assigned (timestamp, truck IDs)
3. Drivers Assigned (timestamp, driver names)
4. Material Loaded (timestamp, location)
5. En Route (timestamp, ETA)
6. Arrived at Site (timestamp)
7. Delivery in Progress (timestamp)
8. Delivery Completed (timestamp, signature)

---

## SECURITY & ACCESS CONTROL

### Head Office Portal
- **Full System Access:** Complete control over all features
- **User Roles:** Admin, Allocator, Operations Manager
- **Permissions:** Create, Read, Update, Delete all jobs
- **Data Visibility:** System-wide access to all clients and subcontractors

### Client Portal
- **Restricted Access:** Own jobs only
- **User Roles:** Client Admin, Client User
- **Permissions:** Create own jobs, Read own jobs, Update own jobs
- **Data Visibility:** Limited to own company jobs and data

### Subcontractor Portal
- **Read-Only Access:** Assigned jobs only
- **User Roles:** Subcontractor Admin, Driver
- **Permissions:** Read assigned jobs only
- **Data Visibility:** Limited to jobs where assigned as subcontractor

---

## INTEGRATION POINTS

### Address Book Integration
- Shared between Head Office and Client Portal
- Synchronization of pickup and delivery locations
- Contact information updates propagate across system
- Sub-location management (Stage Point, Drop Site, Tip Site)

### Driver Management
- Driver pool shared between internal and subcontractor systems
- Driver availability calendars
- Driver performance tracking
- Contact information centralized

### Invoice System
- Automatic invoice generation upon job completion
- Invoice visibility across all relevant portals
- Payment tracking and status updates
- Integration with accounting systems

### Document Management
- Centralized photo and docket storage
- Access permissions based on portal type
- File size limits and format validation
- Timestamp and user tracking for uploads

---

## FUTURE ENHANCEMENTS (Driver App)

**To Be Documented:**
- Driver mobile app functionality
- Real-time GPS tracking
- In-app messaging
- Digital signature capture
- Photo upload from field
- Job acceptance/rejection
- Navigation integration
- Pre-start checklist completion
- Docket generation and submission

---

**End of Document**

*This comprehensive summary covers all job allocation functionality across the Head Office Portal, Client Portal, and Subcontractor Portal. Driver App functionality to be documented in a separate addendum.*
