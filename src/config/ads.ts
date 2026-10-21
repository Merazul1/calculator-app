/**
 * Google AdSense Global Configuration
 * 
 * Replace ADS_CONFIG.client with your approved AdSense Publisher ID (e.g. 'ca-pub-1234567890123456').
 * Replace slot IDs with the unit IDs created in your Google AdSense Dashboard.
 */

export const ADS_CONFIG = {
  // Set to true once your Google AdSense account is approved
  enabled: true,
  
  // Your Google AdSense Publisher ID
  client: 'ca-pub-3890743631653804', 

  // Specific ad slot IDs from your Google AdSense console
  slots: {
    leaderboardTop: '1234567890',
    inArticleMid: '2345678901',
    bottomBanner: '3456789012',
    sidebar: '4567890123',
  },

  // Helper check: is this a real live publisher ID or the default placeholder?
  isLive: function(): boolean {
    return this.enabled && this.client !== 'ca-pub-XXXXXXXXXXXXXXXX' && !this.client.includes('XXXX');
  }
};
