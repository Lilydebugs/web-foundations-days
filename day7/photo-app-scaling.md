# SnapShare Scaling Plan

## 1. Assumptions
- Registered users: 10 million.
- 10% of registered users are active daily.
- Each daily active user uploads 1 photo and views 50 feed pages per day.
- Each original photo is 2 MB and each thumbnail is 50 KB.
- A day has 86,400 seconds and a year has 365 days.
- Peak feed traffic is estimated as 5 times average traffic.
- Estimates use decimal units: 1 TB = 1,000,000 MB. Storage excludes backups, replication and other overhead.

## 2. Traffic and Storage Estimates

### Daily Active Users
Daily active users = 10,000,000 × 10% = 1,000,000 users.

### Uploads per Second
Daily uploads = 1,000,000 × 1 = 1,000,000 uploads/day.
Uploads per second = 1,000,000 ÷ 86,400 = 11.57, or about 12 uploads/second on average.

### Feed Views per Second
Daily feed views = 1,000,000 × 50 = 50,000,000 views/day.
Average feed views per second = 50,000,000 ÷ 86,400 = 579 views/second.
Peak feed views per second = 579 × 5 = 2,895 views/second (approximately 2,894 using unrounded values).

### Storage per Year
Original storage per day = 1,000,000 × 2 MB = 2 TB.
Thumbnail storage per day = 1,000,000 × 0.05 MB = 0.05 TB.
Total storage per day = 2.05 TB.
Total storage per year = 2.05 × 365 = 748.25 TB/year, excluding backups, replicas and other overhead.

## 3. Read-Heavy or Write-Heavy?
SnapShare is read-heavy because users view about 50 million feed pages per day but upload about 1 million photos per day. The design should optimize reads using a cache, a database read replica and a CDN while still handling uploads reliably.

## 4. Where Photos Should Be Stored
Photo files should be stored in object storage, not directly inside the relational database. Large files make databases larger and can increase backup times and costs. The database should store photo metadata and object-storage keys or URLs, while object storage holds the original photos and thumbnails.

## 5. Architecture Diagram

```text
                   Users / Browsers
                          |
                         CDN
                 (cached photos and thumbnails)
                          |
                    Load Balancer
                          |
                 +--------+--------+
                 |                 |
             App Server        App Server
                 |                 |
                 +--------+--------+
                          |
                 +--------+--------+
                 |                 |
              Redis Cache     Primary Database
                                   |
                              Read Replica

Upload processing:
App Server ---> Object Storage (original photo)
     |
     +----> Job Queue ---> Thumbnail Worker
                                  |
                                  v
                           Object Storage
                              (thumbnail)
```

## 6. Components and the Problems They Solve
- CDN: Serves cached photos and thumbnails from locations closer to users, reducing latency and app-server load.
- Load balancer: Distributes requests across app servers to avoid overloading one server and improve availability.
- App servers: Handle authentication, uploads, feed requests and application logic without relying on local persistent state.
- Redis cache: Stores frequently requested feed data and metadata to reduce repeated database queries.
- Primary database: Stores user records, photo metadata, follow relationships and references to photo files.
- Database read replica: Handles read queries to reduce read load on the primary database.
- Object storage: Stores original photos and thumbnails as durable files without filling the database with large binary objects.
- Job queue: Holds thumbnail-generation jobs so uploads do not need to wait for image processing.
- Thumbnail worker: Processes queued jobs, resizes photos and saves thumbnails to object storage.

## 7. Photo Upload Flow
1. A user selects a photo and submits it through the app.
2. The load balancer sends the request to an available app server.
3. The app server authenticates the user and validates the file type and size.
4. The original photo is stored in object storage, and its object key or URL is returned.
5. The app server saves the photo metadata and storage reference in the primary database.
6. The server places a thumbnail-generation job on the queue.
7. The server responds that the upload was accepted without waiting for thumbnail processing.
8. A thumbnail worker takes the job, creates a smaller image and stores it in object storage.
9. The app updates metadata if needed and invalidates or updates affected feed caches.
10. The CDN can serve the photo and thumbnail to users, caching them where appropriate.

## 8. Trade-Offs

### Cache Speed vs. Data Freshness
Caching makes feeds faster and reduces database load, but cached data can become stale after a photo changes. The system must invalidate or update affected entries, adding complexity.

### Asynchronous Thumbnails vs. Immediate Availability
A queue makes uploads faster and allows thumbnail processing to scale independently, but thumbnails may not be available immediately. The app can show a placeholder until processing finishes.

### Read Replica Performance vs. Consistency
A read replica increases read capacity, but replication lag may delay newly uploaded photos appearing in feeds. Critical read-after-write requests can use the primary database when necessary.

### Object Storage vs. Simplicity
Object storage scales well for large files and keeps the database smaller, but it requires separate storage permissions, URLs and lifecycle management.

## Conclusion
SnapShare should use stateless app servers behind a load balancer, a CDN for photo delivery, Redis for frequently accessed data, a primary database with a read replica for metadata, object storage for image files, and a queue with workers for thumbnail processing. This architecture supports high read traffic while keeping uploads and image processing scalable.
