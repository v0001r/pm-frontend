# Support Hub Pro

AI Prompt — Client & Admin Support Ticket Management System

Design and build a modern enterprise Support Ticket Management System with two primary user roles:

Admin / Support Team

Client / Customer

The application should be a professional, clean, modern SaaS-style support portal. The primary purpose is to allow clients to raise support tickets and allow admins/support agents to manage, assign, track, communicate, and resolve those tickets.

1. Authentication & Authorization

Implement secure authentication with role-based access control.

Login

Create a common login page with:

Email / Username

Password

Show/Hide Password

Remember Me

Forgot Password

Login button

Error validation

Loading state

Session management

Logout

After login, redirect users based on their role:

Admin → Admin Dashboard

Client → Client Dashboard

Role-Based Access

There should be two roles:

Admin

Can view all tickets

Can manage clients

Can assign tickets

Can change ticket status

Can change priority

Can communicate with clients

Can add internal notes

Can view reports

Can manage support categories

Can manage support users

Client

Can view only their own tickets

Can create new tickets

Can reply to their tickets

Can upload attachments

Can view ticket status

Can close/reopen tickets where permitted

Can view ticket history

Can update their profile

Clients must never be able to access other clients' tickets.

2. Admin Dashboard

Create a professional admin dashboard with a clear overview of support operations.

KPI Cards

Display:

Total Tickets

Open Tickets

In Progress

Pending Client Response

Resolved Tickets

Closed Tickets

High Priority Tickets

Overdue Tickets

Each KPI should be clickable and take the admin to the corresponding filtered ticket list.

Dashboard Charts

Include:

Tickets Created Over Time

Tickets Resolved Over Time

Tickets by Priority

Tickets by Status

Tickets by Category

Tickets by Client

Average Resolution Time

Use clean and professional charts without making the dashboard visually cluttered.

3. Admin Ticket Management

Create a dedicated Ticket Management module.

Display tickets in a compact, professional table.

Columns:

Ticket ID

Subject

Client

Category

Priority

Status

Assigned To

Created Date

Last Updated

SLA / Due Date

Actions

Filters

Provide visible filters:

Search Ticket ID

Search Subject

Client

Status

Priority

Category

Assigned Agent

Date Range

Include:

Clear Filters

Export

Sort

Pagination

Avoid excessive popups.

4. Ticket Details Page

When an admin opens a ticket, display a complete ticket workspace.

Ticket Header

Show:

Ticket ID

Subject

Status

Priority

Category

Client

Created Date

Last Updated

Assigned Agent

Ticket Conversation

Create a chat-style conversation timeline.

Display:

Client messages

Admin/support messages

Attachments

Date and time

User name

Message status

Make the conversation easy to follow.

Admin Actions

Admin should be able to:

Reply to client

Add internal note

Change status

Change priority

Change category

Assign ticket

Reassign ticket

Add/remove tags

Add attachments

Close ticket

Reopen ticket

Internal notes must be clearly separated from client-visible messages.

5. Ticket Status Workflow

Use the following ticket lifecycle:

New → Open → In Progress → Pending Client → Resolved → Closed

Allow admins to change the ticket status.

Clients should see the current status clearly.

Use appropriate visual indicators for each status.

6. Ticket Priority

Support the following priorities:

Low

Medium

High

Critical

Critical and High priority tickets should be visually highlighted.

7. Ticket Categories

Create configurable ticket categories such as:

Technical Issue

Payment Issue

Account Issue

Access Request

Feature Request

Bug Report

General Query

Other

Admins should be able to add, edit, deactivate, and manage categories.

8. Client Dashboard

Create a separate client-facing dashboard.

The dashboard should be simpler than the admin dashboard.

KPI Cards

Display:

My Open Tickets

In Progress

Waiting for Response

Resolved

Closed

Recent Tickets

Display a table/list containing:

Ticket ID

Subject

Category

Priority

Status

Created Date

Last Updated

Provide a prominent:

+ Create New Ticket

button.

9. Create Ticket

Create a simple and professional ticket creation form.

Fields:

Subject

Category

Priority

Description

Attachment

Additional Information

Allow multiple file attachments.

Show:

File name

File size

Remove attachment option

Upload progress

After submission:

Display a confirmation message:

"Your ticket has been successfully created."

Generate a unique Ticket ID.

Example:

TKT-2026-000125

10. Client Ticket Details

Clients should be able to open their ticket and see:

Ticket ID

Subject

Status

Priority

Category

Created Date

Last Updated

Assigned Support Agent

Conversation history

Attachments

Client should be able to:

Reply

Upload attachments

Close ticket

Reopen ticket if allowed

Do not expose internal admin notes to clients.

11. Client Profile

Create a client profile section.

Fields:

Name

Company

Email

Phone

Profile Photo

Designation

Allow the client to update permitted profile information.

Also include:

Change Password

Logout

Notification Preferences

12. Admin Client Management

Create a Client Management module.

Admin can:

View clients

Search clients

Add client

Edit client

Activate/deactivate client

Reset password

View client details

View client's ticket history

Client detail page should show:

Client information

Total tickets

Open tickets

Resolved tickets

Closed tickets

Recent tickets

Ticket history

13. Support Agent Management

Create a Support Team module.

Admin can:

Add support agents

Edit agents

Activate/deactivate agents

Assign roles

View assigned tickets

View agent workload

Display:

Agent Name

Email

Role

Active Tickets

Resolved Tickets

Average Resolution Time

Status

14. Search

Implement global search.

Admin should be able to search:

Ticket ID

Subject

Client name

Client email

Category

Assigned agent

Client search should be restricted to their own tickets.

Search should be fast and interactive.

15. Notifications

Create a notification system.

Client Notifications

Notify clients when:

Ticket is created

Admin replies

Ticket status changes

Ticket is assigned

Ticket is resolved

Ticket is closed

Admin Notifications

Notify admins when:

New ticket is created

Client replies

High-priority ticket is created

Ticket becomes overdue

Client reopens a ticket

Create a notification bell in the header.

16. Email Notifications

Design the system so email notifications can be integrated.

Examples:

New Ticket

"Your support ticket TKT-2026-000125 has been created successfully."

Admin Reply

"Support has replied to your ticket TKT-2026-000125."

Ticket Resolved

"Your support ticket TKT-2026-000125 has been marked as resolved."

Do not hard-code the email service; structure the application so an email provider/API can be integrated later.

17. SLA Management

Include optional SLA functionality.

Admins should be able to configure:

Priority

Response Time

Resolution Time

SLA Due Date

Example:

Critical → 1 hour response / 4 hour resolution

High → 4 hour response / 12 hour resolution

Medium → 8 hour response / 24 hour resolution

Low → 24 hour response / 72 hour resolution

Display SLA status:

On Track

Approaching Deadline

Breached

18. Reports & Analytics

Create an admin reporting module.

Reports should include:

Tickets Created

Tickets Resolved

Tickets Closed

Open Tickets

Average Response Time

Average Resolution Time

Tickets by Category

Tickets by Priority

Tickets by Client

Tickets by Support Agent

SLA Breaches

Allow date filtering:

Today

Last 7 Days

Last 30 Days

This Month

Last Month

Custom Date Range

Provide export functionality such as CSV/Excel where practical.

19. Audit Logs

Create an Admin Audit Log.

Track important actions such as:

Login

Logout

Ticket created

Ticket updated

Status changed

Priority changed

Ticket assigned

Client created

Client deactivated

Admin created

Password reset

Display:

User

Action

Module

Date & Time

IP Address

Description

20. Admin Settings

Create a Settings module.

Sections:

General Settings

Company Name

Logo

Support Email

Contact Information

Ticket Settings

Ticket ID format

Default priority

Default status

Ticket categories

Ticket statuses

SLA Settings

Response SLA

Resolution SLA

Priority-based SLA

Notification Settings

Email notifications

In-app notifications

User & Role Settings

Admin

Support Agent

Client

21. UI / UX Design

The design should feel like a modern enterprise SaaS application.

Design Principles

Clean

Minimal

Professional

Responsive

Fast

Easy to navigate

Enterprise-grade

Avoid excessive rounded cards

Avoid excessive shadows

Avoid glassmorphism

Avoid unnecessary gradients

Avoid excessive animations

Use a professional layout with:

Left Sidebar + Top Header + Main Content

Sidebar should contain:

Admin

Dashboard
Tickets
Clients
Support Team
Reports
Audit Logs
Settings

Client

Dashboard
My Tickets
Create Ticket
Notifications
Profile

22. Responsive Design

The application must work properly on:

Desktop

Laptop

Tablet

Mobile

On mobile:

Convert sidebar into a hamburger menu

Make ticket tables responsive

Use cards where tables are not practical

Keep ticket conversation easy to read

Make ticket creation mobile-friendly

23. UX Details

Include proper:

Loading states

Empty states

Error states

Success messages

Confirmation dialogs

Form validation

Skeleton loaders

Toast notifications

Examples:

Empty ticket state:

"No tickets found."

Empty client state:

"No clients have been added yet."

24. Security Requirements

Implement proper security architecture.

Include:

Secure authentication

Password hashing

Role-based authorization

Protected routes

Session management

Automatic logout/session expiry

Input validation

File upload validation

File size restrictions

Access control at API/database level

Most importantly:

A client must only be able to access their own tickets and information.

Never rely only on frontend restrictions for authorization.

25. Suggested Database Structure

Design the backend/database around entities such as:

Users

id

name

email

password_hash

role

status

created_at

updated_at

Clients

id

user_id

company

phone

designation

Tickets

id

ticket_number

client_id

subject

description

category_id

priority

status

assigned_to

created_at

updated_at

resolved_at

closed_at

Ticket Messages

id

ticket_id

user_id

message

is_internal

created_at

Attachments

id

ticket_id

message_id

file_name

file_url

file_size

file_type

uploaded_by

Categories

id

name

description

status

Notifications

id

user_id

title

message

type

is_read

created_at

Audit Logs

id

user_id

action

module

description

ip_address

created_at

26. Important Ticket Features

Make the following features prominent in the design:

Ticket Number

Ticket Conversation

Ticket Assignment

Priority

Status

Category

Attachments

Internal Notes

Client Replies

SLA Tracking

Ticket History

Notifications

Search

Filters

Reports

Audit Logs

27. Overall User Journey

Client Journey

Login → Dashboard → Create Ticket → Submit Ticket → Receive Ticket ID → Track Ticket → Communicate with Support → Ticket Resolved → Close Ticket

Admin Journey

Login → Dashboard → View New Ticket → Open Ticket → Assign Agent → Communicate with Client → Update Status → Resolve Ticket → Close Ticket

28. Visual Direction

Create a premium enterprise SaaS UI, similar in usability and polish to modern platforms such as Jira Service Management, Zendesk, Freshservice, and Intercom, but do not directly copy their designs.

Use:

Strong visual hierarchy

Compact professional tables

Clean typography

Consistent spacing

Clear status badges

Clear priority indicators

Professional icons

Accessible contrast

Responsive layouts

The application should look production-ready rather than like a basic CRUD application.

29. Build Priority

First create the complete UI/UX prototype with:

Login

Admin Dashboard

Client Dashboard

Ticket List

Create Ticket

Ticket Details

Ticket Conversation

Client Management

Support Team

Reports

Notifications

Profile

Settings

Then structure the application so authentication, database, file storage, email notifications, and APIs can be connected cleanly.

Use reusable components throughout the application.

Ensure consistent design across every page.

30. Profile & Account Management

Create a complete My Profile / Account Settings section for both Admin/Support users and Clients.

The profile functionality should be accessible from the user's profile/avatar menu in the top-right header.

A. My Profile — Admin / Support Team

Create a dedicated My Profile page for Admin and Support users.

Profile Header

Display:

Profile photo/avatar

Full Name

Email Address

Role

Account Status

Last Login

Member Since

Provide:

Edit Profile button

Personal Information

Allow the user to view and edit:

First Name

Last Name

Profile Photo

Email Address

Phone Number

Job Title / Designation

Department

Time Zone

Some fields such as Role, Account Status, and Member Since should be read-only.

B. Change Password

Create a dedicated Change Password section.

Fields:

Current Password

New Password

Confirm New Password

Include:

Show/Hide Password

Password strength indicator

Password requirements

Validation for matching passwords

Save Password button

Cancel button

Password requirements should include:

Minimum 8 characters

At least one uppercase letter

At least one lowercase letter

At least one number

At least one special character

After successfully changing the password:

Display:

"Your password has been changed successfully."

For security, require the user to re-authenticate or invalidate existing sessions where appropriate.

C. Security Settings

Create a Security section under Profile / Account Settings.

Include:

Login Security

Change Password

Last Login

Active Sessions

Login History

Logout from all other devices

Session Management

Display active sessions with:

Device

Browser

Location (if available)

Last Active

Login Date

Logout button

Provide:

Sign out of all other sessions

D. Two-Factor Authentication

Prepare the UI for optional 2FA.

Include:

Enable Two-Factor Authentication

Disable Two-Factor Authentication

Authentication App

Verification Code

Backup Codes

If 2FA is not implemented in the initial version, create the UI and architecture so it can be integrated later.

31. Client — My Profile

Create a complete My Profile section for clients as well.

Clients should be able to access it from their profile/avatar menu.

Profile Information

Display:

Profile Photo

Full Name

Company Name

Email

Phone Number

Designation

Account Status

Member Since

Allow clients to edit permitted information.

Editable Fields

First Name

Last Name

Profile Photo

Phone Number

Designation

Company Information where permitted

Email should either be read-only or require email verification when changed.

32. Client Password Management

Clients should have the same secure password management functionality.

Change Password

Fields:

Current Password

New Password

Confirm New Password

Include:

Password visibility toggle

Password strength meter

Password requirements

Validation

Save Password

Cancel

Display a confirmation message after successful password change.

33. Forgot Password

Create a complete Forgot Password / Reset Password flow for both Admin and Client users.

Step 1 — Forgot Password

Fields:

Email Address

Button:

Send Reset Link

Display:

"If an account exists with this email address, a password reset link has been sent."

Do not reveal whether an email address exists in the system.

Step 2 — Reset Password

Fields:

New Password

Confirm Password

Include password strength validation.

Step 3 — Success

Display:

"Your password has been reset successfully."

Provide:

Return to Login

34. Email Verification

Support email verification for new accounts and email changes.

New Account

After account creation:

"Please verify your email address to activate your account."

Provide:

Resend Verification Email

Change Email

If a user changes their email address:

Ask for confirmation

Send verification email to new address

Verify new email

Update account email

35. Profile Menu

Create a professional profile dropdown in the top-right corner.

Example:

[Profile Avatar] Bhushan Yadav

Dropdown:

My Profile

Account Settings

Security

Notifications

Change Password

Help & Support

Logout

For Admin:

My Profile

Account Settings

Security

Notifications

Change Password

Help & Support

Logout

For Client:

My Profile

Account Settings

Security

Notifications

Change Password

Help & Support

Logout

36. Notification Preferences

Create a notification preferences page for both Admin and Client.

Allow users to configure:

Email Notifications

Toggle:

New Ticket

Ticket Reply

Status Change

Ticket Assignment

Ticket Resolution

Ticket Closure

Password/Account Security

In-App Notifications

Allow users to enable/disable relevant notification types.

Use clear toggle controls.

37. Account Settings

Create an Account Settings page.

Sections:

Personal Information

Profile details

Security

Password, 2FA, sessions

Notifications

Email and in-app notifications

Privacy

Account visibility and data preferences where applicable

Account Status

Display:

Active

Inactive

Suspended

Clients should not be able to change their account status.

38. Admin User Profile Management

In addition to "My Profile", Super Admin should be able to manage other Admin/Support users.

Create:

Admin / Support User Details

Display:

Profile Photo

Name

Email

Phone

Role

Department

Account Status

Last Login

Created Date

Assigned Tickets

Resolved Tickets

Actions:

Edit User

Activate User

Deactivate User

Reset Password

View Activity

View Assigned Tickets

39. Client Account Management

Super Admin should be able to manage client accounts.

Client details should include:

Profile Photo

Name

Company

Email

Phone

Designation

Account Status

Created Date

Last Login

Total Tickets

Open Tickets

Resolved Tickets

Actions:

Edit Client

Activate

Deactivate

Reset Password

View Profile

View Ticket History

40. Logout

Implement secure logout for all users.

When the user selects Logout:

Show a confirmation:

"Are you sure you want to log out?"

Buttons:

Cancel

Logout

After logout:

Redirect to the Login page.

Invalidate the current authentication session/token.

41. Authentication Screens

Create a complete authentication experience.

Login

Email

Password

Remember Me

Forgot Password

Login

Forgot Password

Email

Send Reset Link

Reset Password

New Password

Confirm Password

Email Verification

Verification status

Resend verification email

Password Changed

Success confirmation

Return to Login

The authentication UI should use the same visual design language as the main application.

42. Account Security UX

For security-sensitive actions such as:

Change Password

Change Email

Disable 2FA

Logout All Sessions

Ask for appropriate confirmation/re-authentication.

Do not expose passwords anywhere in the UI.

Do not store passwords in plain text.

Use secure authentication and password hashing on the backend.

43. Final Navigation Structure

SUPER ADMIN

Dashboard
Tickets
Clients
Support Team
Reports
Audit Logs
Notifications
Settings

Profile Menu

My Profile

Account Settings

Security

Notifications

Change Password

Logout

SUPPORT AGENT

Dashboard
Tickets
My Assigned Tickets
Notifications

Profile Menu

My Profile

Account Settings

Security

Notifications

Change Password

Logout

CLIENT

Dashboard
My Tickets
Create Ticket
Notifications

Profile Menu

My Profile

Account Settings

Security

Notifications

Change Password

Logout

44. Important Requirement

Treat Profile, Authentication, Security, Password Management, Notifications, and Account Settings as reusable components.

The same authentication architecture should support:

Super Admin → Support Agent → Client

while maintaining strict role-based access control.

The frontend should provide the correct UI based on the user's role, but all authorization must also be enforced at the backend/API/database level.

The final application should feel like a complete production-ready enterprise support platform, not simply a ticket CRUD application.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/005f780b-685d-41b0-bfe6-26e480e84591).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
