import  Certificate from '../models/Certificate.js';    

import crypto from 'crypto';

export const generateCertificate = async (studentId, internshipId) => {
    //try{
        const existing = await Certificate.findOne({
            student: studentId,
            internship: internshipId
        });

        if(existing)
            return; //certificate already exists

        await Certificate.create({
            student: studentId,
            internship: internshipId,
            certificateCode: crypto.randomUUID() //generate unique cert ID
        });
    }
   // } /*catch(error){
       // console.error('Error generating certificate:', error);
    //}*/   
