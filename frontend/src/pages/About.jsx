import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../components/ui/card";

const About = () => {
  return (
    <div className=" bg-gray-50 flex items-center justify-center p-6">
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
className="w-full max-w-3xl"
>
<Card className="shadow-xl rounded-2xl ">
<CardContent className="space-y-6">
<h1 className="text-3xl font-bold text-center">About Us</h1>
<p className="text-gray-700 text-lg leading-relaxed text-center">
We are a passionate team dedicated to delivering high‑quality digital
products. Our mission is to create beautiful, functional, and
user‑friendly solutions that help businesses grow.
</p>


<div className="grid md:grid-cols-2 gap-6 pt-4">
<div className="bg-white p-4 rounded-2xl shadow-md">
<h2 className="text-xl font-semibold mb-2">Our Vision</h2>
<p className="text-gray-600">
To empower individuals and brands by building innovative digital
experiences that inspire and create impact.
</p>
</div>


<div className="bg-white p-4 rounded-2xl shadow-md">
<h2 className="text-xl font-semibold mb-2">Our Values</h2>
<p className="text-gray-600">
We prioritize creativity, transparency, and continuous learning in
everything we do.
</p>
</div>
</div>
</CardContent>
</Card>
</motion.div>
</div>
  );
}

export default About;
