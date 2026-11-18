import 'dotenv/config'
import { connectDatabase } from '../config/db.js'
import { College } from '../models/College.js'

async function seed() {
  await connectDatabase()
  const colleges = [
    { name: 'Fergusson College', city: 'Pune', domains: ['fergusson.edu'] },
    { name: 'Symbiosis College of Arts & Commerce', city: 'Pune', domains: ['symbiosiscollege.edu.in'] },
    { name: 'Modern College of Arts, Science and Commerce', city: 'Pune', domains: ['moderncollegepune.edu.in'] },
    { name: 'COEP Technological University', city: 'Pune', domains: [] },
    { name: 'Pune Institute of Computer Technology (PICT)', city: 'Pune', domains: [] },
    { name: 'Vishwakarma Institute of Technology (VIT)', city: 'Pune', domains: [] },
    { name: 'Pimpri Chinchwad College of Engineering (PCCOE)', city: 'Pune', domains: [] },
    { name: "MKSSS's Cummins College of Engineering for Women", city: 'Pune', domains: [] },
    { name: 'MIT World Peace University (MIT-WPU)', city: 'Pune', domains: [] },
    { name: 'Army Institute of Technology (AIT)', city: 'Pune', domains: [] },
    { name: 'Bharati Vidyapeeth Deemed University College of Engineering', city: 'Pune', domains: [] },
    { name: 'Vishwakarma Institute of Information Technology (VIIT)', city: 'Pune', domains: [] },
    { name: 'Symbiosis Institute of Technology (SIT)', city: 'Pune', domains: [] },
    { name: 'AISSMS College of Engineering', city: 'Pune', domains: [] },
    { name: 'AISSMS Institute of Information Technology (AISSMS IOIT)', city: 'Pune', domains: [] },
    { name: "PVG's College of Engineering and Technology (PVG COET)", city: 'Pune', domains: [] },
    { name: 'Dr. D. Y. Patil Institute of Technology', city: 'Pune', domains: [] },
    { name: "JSPM's Rajarshi Shahu College of Engineering (RSCOE)", city: 'Pune', domains: [] },
    { name: 'Sinhgad College of Engineering (SCOE)', city: 'Pune', domains: [] },
    { name: 'P.E.S. Modern College of Engineering', city: 'Pune', domains: [] },
    { name: "Marathwada Mitra Mandal's College of Engineering (MMCOE)", city: 'Pune', domains: [] },
    { name: "Modern Education Society's Wadia College of Engineering (MESCOE)", city: 'Pune', domains: [] },
    { name: 'Zeal College of Engineering and Research (ZCOER)', city: 'Pune', domains: [] }
  ]
  for (const college of colleges) {
    await College.updateOne({ name: college.name }, { $set: college }, { upsert: true })
  }
  console.log(`Seeded ${colleges.length} Pune colleges`)
  process.exit(0)
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
