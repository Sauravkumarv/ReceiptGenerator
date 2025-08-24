class AnalyticsService {
  constructor() {
    this.events = []
    this.sessionId = this.generateSessionId()
  }

  generateSessionId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  track(eventName, properties = {}) {
    const event = {
      name: eventName,
      properties: {
        ...properties,
        sessionId: this.sessionId,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      }
    }

    this.events.push(event)
    
    // In production, send to analytics service
    if (import.meta.env.PROD) {
      this.sendToAnalytics(event)
    } else {
      console.log('Analytics Event:', event)
    }
  }

  async sendToAnalytics(event) {
    try {
      // Replace with your analytics endpoint
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      })
    } catch (error) {
      console.error('Failed to send analytics:', error)
    }
  }

  // Track specific receipt generator events
  trackReceiptGenerated(receiptData) {
    this.track('receipt_generated', {
      itemCount: receiptData.items.length,
      hasDiscount: receiptData.discount > 0,
      taxRate: receiptData.taxRate,
      total: receiptData.total
    })
  }

  trackReceiptDownloaded(format) {
    this.track('receipt_downloaded', { format })
  }

  trackFormFieldChanged(fieldName) {
    this.track('form_field_changed', { fieldName })
  }
}

export const analytics = new AnalyticsService()