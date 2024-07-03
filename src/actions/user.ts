"use server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod"
import axios, { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getUserScore = async (email: string) => {
    const res = await fetch(process.env.SERVER_URI + `/users/${email}/score`, {
        cache: "reload"
    })
    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }

    return (await res.json()).score
}

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const ProfileSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    image: z.any()
        .refine((file) => !file || file?.size <= MAX_FILE_SIZE, "Max image size is 5MB.")
        .refine(
            (file) => !file || [ACCEPTED_IMAGE_TYPES].includes(file?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ).optional()
})
 
export type State = {
    errors?: {
        name?: string[];
        email?: string[];
        image?: string[]
        password?: string[]
        "change-password"?: string[]
    };
    status?: string;
    message?: string | null;
};

export const saveProfile = async (
    prevState: State,
    formData: FormData,
) => {
    try {
        const validatedFields = ProfileSchema.safeParse({
            name: formData.get("name"),
            email: formData.get("email"),
            image: formData.get("image"),
        });
        
        if (!validatedFields.success) {
            return {
                status: "Error",
                errors: validatedFields.error.flatten().fieldErrors,
                message: "Missing Fields. Failed to save profile.",
            };
        }
        
        const { email, image: file, name } = validatedFields.data;

        const saveNameData: {
            name?: string,
            email?: string,
            image?: string
        } = {
            email,
            name
        }
        
        const imageFile = file as File
        
        if(file?.size > 0){
            const Bucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
            const s3 = new S3Client({
                region: process.env.NEXT_PUBLIC_AWS_REGION,
                credentials: {
                    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
                    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
                },
            });
            
            
            const ext = imageFile?.name.split(".").at(-1);
            const uid = uuidv4().replace(/-/g, "");
            const fileName = `${uid}${ext ? "." + ext : ""}`;
            const arrayBuffer = await imageFile.arrayBuffer()
            const uploadToS3 = new PutObjectCommand({
                Bucket,
                Key: fileName,
                Body: Buffer.from(arrayBuffer),
            });
            await s3.send(uploadToS3);
            saveNameData.image = `https://tuniko-bucket.s3.amazonaws.com/${fileName}`
        }
        
       await axios.post(process.env.SERVER_URI + "/users", saveNameData)
        revalidatePath("/settings/profile");
        redirect("/settings/profile");
    } catch (error) {
        if (error instanceof AxiosError) {
            switch (error.response.status) {
                case 400:
                    return {
                        status: "Error",
                        message: "Invalid paramaters."
                     };
                default:
                    return { 
                        status: "Error", 
                        message: "Network error" 
                };
            }
        }
        throw error
    }

    
}

const ChangePasswordSchema = z.object({
    email: z.string().email(),
    password: z.string().min(7),
    "confirm-password": z.string().min(7),
}).refine((state) => {
    return state.password === state["confirm-password"]
}, "The password did not match the confirm password.")

export const changePassword = async (
    prevState: State,
    formData: FormData,
) => {
    try {
        console.log(formData)
        const validatedFields = ChangePasswordSchema.safeParse({
            email: formData.get("email"),
            password: formData.get("password"),
            "confirm-password": formData.get("confirm-password"),
        });
        if (!validatedFields.success) {
            return {
                status: "Error",
                errors: validatedFields.error.flatten().fieldErrors,
                message: "Missing Fields. Failed to change password.",
            };
        }

        const { email, password } = validatedFields.data;
        const changePasswordData = {
            email,
            password
        }
        await axios.post(process.env.SERVER_URI + "/change-password", changePasswordData)
        revalidatePath("/settings/profile");
        redirect("/settings/profile");
    } catch (error) {
        if (error instanceof AxiosError) {
            switch (error.response.status) {
                case 400:
                    return {
                        status: "Error",
                        message: "Invalid paramaters." };
                default:
                    return {
                        status: "Error",
                        message: "Network error" };
            }
        }
       throw error
    }
}