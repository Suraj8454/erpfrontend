import { format, formatDistanceToNow, parseISO } from 'date-fns'

export const formatDate = (date) => {
  if (!date) return '-'
  try {
    return format(parseISO(date), 'dd MMM yyyy')
  } catch {
    return date
  }
}

export const formatDateTime = (date) => {
  if (!date) return '-'
  try {
    return format(parseISO(date), 'dd MMM yyyy HH:mm')
  } catch {
    return date
  }
}

export const formatCurrency = (amount) => {
  if (!amount) return '₹0'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const formatNumber = (num) => {
  if (!num) return '0'
  return new Intl.NumberFormat('en-IN').format(num)
}

export const getStatusColor = (status) => {
  const colors = {
    'Active': 'success',
    'Inactive': 'danger',
    'Pending': 'warning',
    'Completed': 'success',
    'Cancelled': 'danger',
    'Draft': 'gray',
    'Approved': 'success',
    'Rejected': 'danger',
    'Sent': 'info',
    'Received': 'success',
    'Partial': 'warning',
    'Paid': 'success',
    'Unpaid': 'danger',
    'Overdue': 'danger',
    'New': 'info',
    'Contacted': 'warning',
    'Qualified': 'success',
    'Negotiation': 'warning',
    'Won': 'success',
    'Lost': 'danger',
    'Hold': 'warning',
    'Accepted': 'success',
    'Expired': 'danger',
  }
  return colors[status] || 'default'
}

export const getInitials = (name) => {
  if (!name) return ''
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export const truncateText = (text, length = 50) => {
  if (!text) return ''
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

export const generateId = (prefix) => {
  const timestamp = new Date().getTime().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `${prefix}-${timestamp}${random}`
}

export const timeAgo = (date) => {
  if (!date) return '-'
  try {
    return formatDistanceToNow(parseISO(date), { addSuffix: true })
  } catch {
    return date
  }
}

export const downloadCSV = (data, filename) => {
  if (!data || data.length === 0) return
  
  const headers = Object.keys(data[0])
  const csv = [
    headers.join(','),
    ...data.map(row => headers.map(h => JSON.stringify(row[h] || '')).join(','))
  ].join('\n')
  
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}.csv`
  a.click()
  window.URL.revokeObjectURL(url)
}