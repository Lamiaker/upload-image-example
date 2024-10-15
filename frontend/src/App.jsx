import { Button } from '@mantine/core'
import React from 'react'
import FileUpload from './components/FileUpload'
import FileUploadMantine from './components/FileUploadMantine'

export default function App() {
  return (
    <div>
      <FileUploadMantine></FileUploadMantine>
      {/* <FileUpload></FileUpload> */}
    </div>
  )
}
