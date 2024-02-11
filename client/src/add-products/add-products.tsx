import axios from "axios";
import { useState } from "react";
import { useForm, SubmitHandler, set } from "react-hook-form"
import toast from "react-hot-toast";

interface IFormInput {
    productName: string;
    productImage: string;
    description: string;
    quantity: number;
    unitPrice: number;
}

const AddProducts = () => {
    const [loading, setLoading] = useState(false)
    const [isImageUploaded, setIsImageUploaded] = useState(false)
    const [filename, setFilename] = useState()

    const [file, setFile] = useState()


    const { register, handleSubmit,reset } = useForm<IFormInput>()

    const onSubmit: SubmitHandler<IFormInput> = async(data) => {
        try {
            setLoading(true)
            const addProduct = await axios.post("http://localhost:4000/api/products/addProducts?ak=adadad",{
                productName: data.productName,
                productImage: filename,
                description: data.description,  
                quantity: data.quantity,
                unitPrice: data.unitPrice
            }).then(() =>{
                toast.success("Product Added Successfully")
            })
            console.log(data.productImage[0])
            reset()
        } catch (error) {
            console.log("ADD_PRODUCT",error)
        } finally{
            setLoading(false)
        }
        // console.log(data.productImage[0])
    }

    const handleUpload = async(e) => {
        const formData = new FormData()
        formData.append("file",file)
        const fileData =await axios.post("http://localhost:4000/api/products/uploadFile", formData)
            .then(res => {
                setFilename(res.data.file_name)
                toast.success("Image Uploaded Successfully")
            })
            .catch(err => console.log(err))
    }

    return ( 
        <form  onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label className="form-label fw-bold">Product Name:</label>
                <input {...register("productName")} required type="text" className="form-control border border-primary" id="exampleFormControlInput1" placeholder="example product" />
            </div>
            <div className="mb-3 col">
                <label className="form-label fw-bold">Product Image:</label>
                <input {...register("productImage")} onChange={(e: Event) => {setFile(e.target?.files[0])}} required type="file" className="form-control border border-primary" id="exampleFormControlInput1" placeholder="example product" />
                <button type="button" onClick={handleUpload} className="btn btn-success btn-md mt-2">Upload a Image</button>
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold">Description:</label>
                <textarea {...register("description")} required type="text" className="form-control border border-primary" id="exampleFormControlInput1" placeholder="example: one of the best produxt" />
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold">Quantity:</label>
                <input {...register("quantity")} type="number" className="form-control border border-primary" id="exampleFormControlInput1" placeholder="example: 23" />
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold">Unit Price:</label>
                <input {...register("unitPrice")} required type="number" className="form-control border border-primary" id="exampleFormControlInput1" placeholder="example: 55" />
            </div>
            <button type="submit" className="btn btn-primary btn-lg">Submit</button>
        </form>
     );
}
 
export default AddProducts;



