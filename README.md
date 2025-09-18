# My Frequency App

A React Native mobile application built with Expo, featuring a complete EAS Build and deployment pipeline for iOS and Android platforms.

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Development Workflow](#development-workflow)
- [Build and Deployment](#build-and-deployment)
- [Stakeholder Testing](#stakeholder-testing)
- [Production Deployment](#production-deployment)
- [Team Collaboration](#team-collaboration)
- [Troubleshooting](#troubleshooting)
- [Project Structure](#project-structure)

## Project Overview

**Bundle Identifiers:**

- iOS: `com.plabs.myfrequency`
- Android: `com.plabs.myfrequency`

**EAS Project ID:** `cd382a7b-f16f-403c-8dbb-48c4443fe06d`

**Deployment Strategy:**

- **Preview builds** for stakeholder feedback and internal testing
- **Production builds** for App Store and Play Store distribution
- **TestFlight distribution** for iOS beta testing
- **Direct APK distribution** for Android testing

## Prerequisites

### Required Accounts

- **Expo Account** - Sign up at https://expo.dev/signup
- **Apple Developer Account** - $99/year at https://developer.apple.com/programs/ (required for iOS builds)
- **Google Play Console** - $25 one-time (only needed for Play Store publishing)
- **GitHub Account** - For version control and team collaboration

### Required Software

- **Node.js 20.16.0+** - Download from https://nodejs.org
- **Git** - For version control
- **iOS/Android device** - For testing

### CLI Tools Installation

```bash
# Install required CLI tools
npm install -g eas-cli
npm install -g @expo/cli

# Verify installations
node --version     # Should be 20.16.0+
eas --version      # Should be 16.19.3+
npx @expo/cli --version  # Should be 54.0.6+
```

## Initial Setup

### 1. Clone and Setup Project

```bash
# Clone the repository
git clone [repository-url]
cd MyFrequency

# Install dependencies
npm install

# Login to Expo
eas login
```

### 2. Project Configuration

The project is configured with:

- **EAS Build** profiles in `eas.json`
- **App configuration** in `app.json`
- **Build scripts** in `package.json`

### 3. Apple Developer Account Setup (iOS only)

```bash
# Connect Apple Developer account and register devices
eas device:create

# Follow prompts to:
# - Connect your Apple Developer account
# - Register test devices
# - Generate certificates and provisioning profiles
```

## Development Workflow

### Local Development

```bash
# Start development server
npx expo start

# For device testing with Expo Go
# Scan QR code with Expo Go app (iOS) or camera app (Android)

# For custom development builds
npx expo start --dev-client
```

### Code Changes and Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make your changes
# ... code development ...

# Commit changes
git add .
git commit -m "Description of changes"

# Push to GitHub
git push origin feature/your-feature-name

# Create pull request for code review
# Merge to main branch when approved
```

## Build and Deployment

### Build Profiles

#### Preview Builds (Internal Testing)

- **Purpose:** Stakeholder feedback, internal testing
- **Distribution:** Direct download URLs, TestFlight
- **Profile:** `preview`

#### Production Builds (App Stores)

- **Purpose:** App Store and Play Store releases
- **Distribution:** App stores via EAS Submit
- **Profile:** `production`

### Creating Preview Builds

For stakeholder testing and feedback:

```bash
# Build for all platforms (recommended)
eas build --profile preview --platform all

# Build for specific platform
eas build --profile preview --platform ios
eas build --profile preview --platform android

# Build with cache clearing (if issues)
eas build --profile preview --platform all --clear-cache
```

**Build Process:**

- Takes 15-20 minutes for iOS
- Takes 10-15 minutes for Android
- Builds run in parallel when using `--platform all`
- You receive download URLs when complete

**Example Output:**

```
✅ Build completed

iOS: https://expo.dev/artifacts/eas/[build-id].ipa
Android: https://expo.dev/artifacts/eas/[build-id].apk
```

### Creating Production Builds

For app store submissions:

```bash
# Production build
eas build --profile production --platform all

# Submit to app stores
eas submit --platform ios --latest
eas submit --platform android --latest
```

### Managing Builds

```bash
# List recent builds
eas build:list --limit 10

# Cancel a running build
eas build:cancel [build-id]

# View build logs
eas build:view [build-id]
```

## Stakeholder Testing

### Distribution Process

1. **Create preview build**
2. **Share download URLs with stakeholders**
3. **Stakeholders install and test**
4. **Collect feedback and iterate**

### Installation Instructions for Stakeholders

#### iOS Installation

1. Open the iOS URL on your iPhone
2. Tap "Install"
3. App will install to home screen
4. Open and test

**Requirements:**

- Device must be registered with our Apple Developer account
- Contact dev team to register new devices

#### Android Installation

1. Open the Android URL on your Android device
2. Download the APK file
3. Install (may need to allow "Install from Unknown Sources")
4. Open and test

**No registration required for Android testing**

### Stakeholder Communication Template

```
📱 NEW BUILD AVAILABLE

iOS: [iOS-URL]
Android: [Android-URL]

Changes in this version:
- [List key changes]
- [Feature additions]
- [Bug fixes]

Please test and provide feedback by [date].

Issues? Reply to this message or contact [contact-info].
```

## Production Deployment

### TestFlight Distribution

TestFlight is Apple's official beta testing platform that allows you to distribute iOS builds to up to 10,000 external testers without requiring device registration.

#### TestFlight vs Direct Distribution

**TestFlight Advantages:**

- No device UDID registration required
- Support for up to 10,000 testers
- Automatic update notifications to testers
- Built-in feedback collection
- Professional distribution experience
- No 90-day app expiration

**TestFlight Disadvantages:**

- Requires App Store review for external testing (1-3 days)
- More complex setup than direct distribution
- Requires App Store Connect access management

#### Setting Up TestFlight

1. **Ensure App Store Connect App Exists**

   ```bash
   # First build will create the app in App Store Connect
   eas build --profile production --platform ios
   ```

2. **Submit to TestFlight**

   ```bash
   # Submit latest build to TestFlight
   eas submit --platform ios --latest

   # Or submit specific build
   eas submit --platform ios --id [build-id]
   ```

3. **Configure TestFlight Settings**
   - Go to App Store Connect: https://appstoreconnect.apple.com
   - Navigate to your app → TestFlight
   - Add external testers or groups
   - Configure build settings and testing information

#### Managing TestFlight Testers

**Adding Individual Testers:**

1. In App Store Connect → TestFlight → External Testing
2. Click "Add Testers"
3. Enter email addresses
4. Testers receive email invitation with TestFlight install link

**Creating Tester Groups:**

1. Create groups (e.g., "Stakeholders", "QA Team", "Beta Users")
2. Add testers to appropriate groups
3. Assign builds to specific groups

**TestFlight Commands:**

```bash
# Build and submit to TestFlight
eas build --profile production --platform ios
eas submit --platform ios --latest

# Check submission status
eas submission:list --platform ios

# View submission details
eas submission:view [submission-id]
```

#### TestFlight Workflow for Stakeholder Testing

1. **Build and Submit**

   ```bash
   eas build --profile production --platform ios
   eas submit --platform ios --latest
   ```

2. **Wait for Processing** (15-30 minutes)

   - Build processes automatically
   - Available for internal testing immediately
   - External testing requires Apple review (1-3 days for first submission)

3. **Add Testers in App Store Connect**

   - Add stakeholder email addresses
   - Create relevant testing groups
   - Set up testing instructions

4. **Distribute to Testers**

   - Select build in TestFlight
   - Add to external testing groups
   - Testers receive email invitations

5. **Tester Experience**
   - Install TestFlight app from App Store
   - Accept invitation email
   - Install your app via TestFlight
   - Automatic notifications for new builds

#### TestFlight Communication Template

```
📱 NEW iOS BUILD AVAILABLE ON TESTFLIGHT

Version: [version-number]
Build: [build-number]

Changes in this version:
- [List key changes]
- [Feature additions]
- [Bug fixes]

To install:
1. Install TestFlight from the App Store (if not already installed)
2. Check your email for the TestFlight invitation
3. Tap "Accept" in the email or use this link: [testflight-link]
4. Install and test the app

Please test and provide feedback by [date].
Use TestFlight's built-in feedback feature or reply to this message.

Note: TestFlight builds expire after 90 days but you'll receive automatic updates.
```

#### TestFlight Best Practices

**For Stakeholder Testing:**

- Use production profile builds for TestFlight
- Set clear testing instructions in App Store Connect
- Create separate groups for different stakeholder types
- Use TestFlight's feedback collection features
- Send regular updates with clear changelogs

**Build Versioning:**

```json
// In app.json, increment for each TestFlight build
{
  "expo": {
    "version": "1.0.0",
    "ios": {
      "buildNumber": "123" // Auto-incremented by EAS
    }
  }
}
```

**Managing Multiple Builds:**

- Keep 2-3 recent builds active for different testing phases
- Archive old builds to reduce clutter
- Use clear build notes for each TestFlight submission

### App Store Submission Process

#### iOS App Store (Production Release)

```bash
# Build and submit for App Store release
eas build --profile production --platform ios
eas submit --platform ios --latest

# Monitor submission status
eas submission:list --platform ios
```

#### Google Play Store

```bash
# Build and submit
eas build --profile production --platform android
eas submit --platform android --latest

# Monitor submission status
eas submission:list --platform android
```

### Release Management

#### Version Bumping

Update version in `app.json`:

```json
{
  "expo": {
    "version": "1.1.0",
    "ios": {
      "buildNumber": "2"
    },
    "android": {
      "versionCode": 2
    }
  }
}
```

#### Release Channels

- **Preview channel:** Internal testing and stakeholder feedback
- **Production channel:** App store releases

## Team Collaboration

### Repository Management

- **Main branch:** Production-ready code
- **Feature branches:** Individual feature development
- **Pull requests:** Required for all changes to main
- **Code reviews:** Required before merging

### Development Roles

#### Developers

```bash
# Daily workflow
git pull origin main
# ... make changes ...
git add .
git commit -m "Feature: description"
git push origin feature-branch
# Create pull request
```

#### Project Lead/DevOps

```bash
# Create builds for stakeholders
eas build --profile preview --platform all

# Deploy to production
eas build --profile production --platform all
eas submit --platform all --latest
```

### Communication Channels

- **GitHub Issues:** Bug reports and feature requests
- **Pull Requests:** Code reviews and discussions
- **Slack/Email:** Build notifications and stakeholder communication

## Troubleshooting

### Common Build Issues

#### iOS Certificate Problems

```bash
# Re-setup certificates
eas credentials:list
eas device:create
```

#### Android Keystore Issues

```bash
# Generate new keystore
eas build --profile preview --platform android --clear-cache
```

#### Missing Assets Errors

- Ensure all referenced assets exist in `assets/` folder
- Check `app.json` for correct asset paths

### Build Queue Issues

- Free tier has longer queue times
- Consider upgrading to paid plan for faster builds
- Android builds typically have shorter queues than iOS

### Network/Installation Issues

#### iOS Installation Fails

- Verify device is registered: `eas device:list`
- Check Apple Developer account status
- Ensure valid provisioning profile

#### Android Installation Fails

- Enable "Install from Unknown Sources" in Android settings
- Try downloading APK directly to device vs transferring from computer

### Getting Help

```bash
# View detailed build logs
eas build:view [build-id]

# Check project status
eas project:info

# List all builds
eas build:list --limit 20
```

## Project Structure

```
MyFrequency/
├── App.js                 # Main application component
├── app.json              # Expo configuration
├── eas.json              # EAS Build configuration
├── package.json          # Dependencies and scripts
├── assets/               # Images, icons, splash screens
│   ├── icon.png
│   ├── splash.png
│   ├── adaptive-icon.png
│   └── favicon.png
├── components/           # Reusable components
├── screens/              # Screen components
├── navigation/           # Navigation configuration
├── services/             # API services and utilities
├── constants/            # App constants and configuration
└── README.md            # This file
```

### Key Configuration Files

#### `eas.json` - Build Configuration

```json
{
  "cli": {
    "version": ">= 16.19.3",
    "appVersionSource": "remote"
  },
  "build": {
    "preview": {
      "distribution": "internal",
      "channel": "preview"
    },
    "production": {
      "autoIncrement": true,
      "channel": "production"
    }
  }
}
```

#### `app.json` - App Configuration

Contains app metadata, bundle identifiers, assets configuration, and update settings.

## Useful Commands Reference

### Development

```bash
npx expo start                    # Start development server
npx expo start --dev-client      # Start for custom builds
npx expo install [package]       # Install Expo-compatible packages
```

### Building

```bash
eas build --profile preview --platform all     # Preview builds
eas build --profile production --platform all  # Production builds
eas build:list                                 # List builds
eas build:cancel [build-id]                    # Cancel build
```

### Deployment

```bash
eas submit --platform ios --latest      # Submit to App Store
eas submit --platform android --latest  # Submit to Play Store
```

### Project Management

```bash
eas project:info          # Project information
eas device:list          # List registered devices
eas device:create        # Register new device
```

---

## Support

For technical issues or questions:

1. Check this README first
2. Review build logs: `eas build:view [build-id]`
3. Check Expo documentation: https://docs.expo.dev/
4. Contact the development team

**EAS Dashboard:** https://expo.dev/accounts/arus/projects/my-frequency-app

**Last Updated:** September 2025
