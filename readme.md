<div align="center">
    <!-- <img src="./docs/peeker-01.png" alt="peeker illustration" height="300"> -->
    <h1>🛸️ scotty 🛸️</h1>
</div>

## THIS PROJECT HAS BEEN ARCHIVED FOR NOW ##

`scotty` is a WebSocket-enabled PDF viewer, allowing multiple clients to look at and browse through a document together in real time. ([*Who's Scotty?*](https://en.wikipedia.org/wiki/Beam_me_up,_Scotty))


<div align="center">
    <strong><a href="https://raa-scotty.herokuapp.com/">The app is available here.</a></strong>
    <a href="https://www.figma.com/file/nB8XWWZCOI7kFJGivVbsWh/scotty?node-id=0%3A1">View v1.0 designs here.</a>
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
`scotty` is an early-stage work-in-progress. This means that while clients can upload and view PDFs, the app's UI/UX is fairly limited. A redesign is currently in the works and can be viewed [here](https://www.figma.com/file/nB8XWWZCOI7kFJGivVbsWh/scotty?node-id=0%3A1).

A list of additional functionalities (and bugs) can be viewed on the project's [issues page](https://github.com/raa-tools/scotty/issues).

## Technical Information
Because internal documents contain confidential information, they are treated with caution. That said, there is still room for improvement, such as adding authentication, making S3 permissions more restrictive, etc.

### Currently...
- Uses HTTPS by default (through Heroku)
- PDFs are hosted on Amazon's S3 only for the duration of a session.
    - Once all clients leave the room associated with a PDF, the file object is deleted from S3.
    - S3 bucket's CORS only allowed deployed URL as origin
- `room` IDs, `user` IDs, and temporary file names are all stored in memory.
