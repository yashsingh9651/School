import * as Yup from 'yup';
export const Schema = Yup.object({
    studentName:Yup.string().min(2).max(25).required("Please Enter Student's Full Name"),
    FatherName:Yup.
    string().min(2).max(25).required("PleaseEnter Student's Father Name"),
    adClass:Yup.string().required('Please Select Class'),
    email:Yup.string().email().required('Please Enter Your Valid Email'),
    amount:Yup.number().required('')
});