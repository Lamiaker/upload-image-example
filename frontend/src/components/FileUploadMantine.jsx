import { Button, FileInput } from '@mantine/core';
import axios from 'axios';
import React from 'react';
import { Controller, useForm } from 'react-hook-form'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


let schema = Yup.object().shape({
    photo: Yup.mixed().required('Photo is required'),
});


export default function FileUploadMantine() {

    const handleUpload = async (data) => {

        console.log(data);

        try {
            const response = await axios.post('http://localhost:4000/upload', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(`File uploaded successfully: ${response.data.file.filename}`);
        } catch (error) {
            console.log('Error uploading file.');
            console.error('Upload error:', error);
        }
    };


    const { handleSubmit, control, formState: { errors, isValid } } = useForm({
        defaultValues: {
            photo: '',
        },
        resolver: yupResolver(schema)
    })

    return (
        <div>
            <h1>Upload a Photo</h1>
            <form onSubmit={handleSubmit(handleUpload)}>
                <Controller
                    name="photo"
                    control={control}
                    render={({ field }) => (
                        <FileInput
                            placeholder="uploade photo"
                            error={errors?.photo?.message}
                            {...field}
                        />
                    )}
                />
                <Button type="submit">Upload</Button>
            </form>
        </div>
    );
}
