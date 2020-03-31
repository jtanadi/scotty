<div align="center">
    <!-- <img src="./docs/peeker-01.png" alt="peeker illustration" height="300"> -->
    <h1>🛸️ scotty 🛸️</h1>
</div>

`scotty` is a WebSocket-enabled PDF viewer, allowing multiple clients to look at and browse through a document together in real time.

[*Who's Scotty?*](https://en.wikipedia.org/wiki/Beam_me_up,_Scotty)

<div align="center">
    <strong><a href="https://raa-scotty.herokuapp.com/">The app is available here.</a></strong>
</div>

## Basic Functionality
`scotty` is designed to be a lightweight app and isn't comparable to a product like Google Slides. The app's main purpose is to allow multiple people to have the same view of the same document in real time, as if they're in the same room together (page navigations are synchronized, so everyone is always on the same page).

#### Hosting
1. Upload PDF
2. Once the PDF has been uploaded, the client will be redirected to a private `room`.
3. Share the `room`'s URL with everyone on your team.

#### Joining
1. Navigate to link provided by host

## Additional Functionality
`scotty` is an early-stage work-in-progress. This means that while clients can upload and view PDFs, the app's UI/UX is fairly limited. For instance, there is only limited support for page navigation and no support for other behaviors, such as panning when zoomed in.

Some additional functionality that may be added as the project matures (full list in [issues](https://github.com/raa-tools/scotty/issues)):
- Non-latin language support
- Allow clients to add annotations and comments
- Drag-and-drop file to upload (similar to WeTransfer)

## Technical Information
Because internal documents contain confidential information, they are treated with caution. That said, there is still room for improvement, such as adding authentication, making S3 permissions more restrictive, etc.

### Currently...
- Uses HTTPS by default (through Heroku)
- PDFs are hosted on Amazon's S3 only for the duration of a session.
    - Once all clients leave the room associated with a PDF, the file object is deleted from S3.
    - S3 bucket's CORS only allowed deployed URL as origin
- `room` IDs, `user` IDs, and temporary file names are all stored in memory.
