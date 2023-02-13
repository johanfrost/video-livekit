Primary domain name (i.e. livekit.myhost.com): lk.aquro.com
TURN domain name (i.e. livekit-turn.myhost.com): lk-turn.aquro.com
✔ latest
✔ no - (we'll bundle Redis)
✔ Startup Shell Script
Your production config files are generated in directory: lk.aquro.com

Please point DNS for lk.aquro.com and lk-turn.aquro.com to the IP address of your server.
Once started, Caddy will automatically acquire TLS certificates for the domains.

The file "init_script.sh" is a script that can be used in the "user-data" field when starting a new VM.

Please ensure the following ports are accessible on the server
 * 443 - primary HTTPS and TURN/TLS
 * 80 - for TLS issuance
 * 7881 - for WebRTC over TCP
 * 443/UDP - for TURN/UDP
 * 50000-60000/UDP - for WebRTC over UDP

Server URL: wss://lk.aquro.com
API Key: APIbnHcNfdu48RA
API Secret: SWK1agqopSOSxNHwHERMa7F2bl8WEwCepCboW8u13WX

Here's a test token generated with your keys: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTE4NDg3NTUsImlzcyI6IkFQSWJuSGNOZmR1NDhSQSIsImp0aSI6InRvbnlfc3RhcmsiLCJuYW1lIjoiVG9ueSBTdGFyayIsIm5iZiI6MTY3NTg0ODc1NSwic3ViIjoidG9ueV9zdGFyayIsInZpZGVvIjp7InJvb20iOiJzdGFyay10b3dlciIsInJvb21Kb2luIjp0cnVlfX0.l-AY2l2oIRThwI-7n-av9QVbvHup4I7S0U2FkpBOOTE

An access token identifies the participant as well as the room it's connecting to





livekit-cli create-token \
    --api-key APIbnHcNfdu48RA --api-secret SWK1agqopSOSxNHwHERMa7F2bl8WEwCepCboW8u13WX \
    --join --room my-first-room --identity user1 \
    --valid-for 100h



user1:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzYzMzI4MjcsImlzcyI6IkFQSWJuSGNOZmR1NDhSQSIsIm5hbWUiOiJ1c2VyMSIsIm5iZiI6MTY3NTk3MjgyNywic3ViIjoidXNlcjEiLCJ2aWRlbyI6eyJyb29tIjoibXktZmlyc3Qtcm9vbSIsInJvb21Kb2luIjp0cnVlfX0.2Hz79HrJ9tzx1vprEDQIHPfJ7DO2Qp19Ikj_dfbZYKM


user2:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzYzMzI4NDksImlzcyI6IkFQSWJuSGNOZmR1NDhSQSIsIm5hbWUiOiJ1c2VyMiIsIm5iZiI6MTY3NTk3Mjg0OSwic3ViIjoidXNlcjIiLCJ2aWRlbyI6eyJyb29tIjoibXktZmlyc3Qtcm9vbSIsInJvb21Kb2luIjp0cnVlfX0.mlTAsbCyC-PvyAsxzzb6ft7lMpKRHsgqlOZWiR8TXiQ


user3: 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzYzMzI4NjIsImlzcyI6IkFQSWJuSGNOZmR1NDhSQSIsIm5hbWUiOiJ1c2VyMyIsIm5iZiI6MTY3NTk3Mjg2Miwic3ViIjoidXNlcjMiLCJ2aWRlbyI6eyJyb29tIjoibXktZmlyc3Qtcm9vbSIsInJvb21Kb2luIjp0cnVlfX0.p4C0ttqOm1EpMWfPZGjTcHH4hMRXUEOo7138OChkays