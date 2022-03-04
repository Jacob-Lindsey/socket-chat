# SocketChat

## Features to be implemented

- [x] Allow room-specific username to be set
- [x] Allow custom room names to be set, otherwise it should be auto-generated
- [ ] Allow the room's creator/admins to require a password to be required to enter the room
- [x] Allow the room's creator/admins to enable chat persistence, otherwise it will only exist on a session-basis
- [x] Allow the room's creator/admins to enable a list of the room's current usernames
- [ ] Allow a user to select which color their chat bubbles will be (Maybe globally and/or per room?)
- [x] Notify the room when one or more users are currently typing
- [ ] Allow the app to be run on a mobile device as a native app (Web frame?)
- [ ] ~~Move the node server process to a publicly accessible provider~~ May not be needed

## SockChat Server

To set up is very easy.
Just run:
```bash
npm run setup
```
After the installation is complete, then run:
```bash
npm run dev
```