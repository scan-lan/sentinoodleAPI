
const _getMedication = (prisma, medication_id) => prisma.medication.findUnique({
  where: {
    id: medication_id
  }
})

const getMedication = async (prisma, medication_id, callback) => {
  const medication = await _getMedication(prisma, medication_id);
  callback(medication);
  console.log(medication);
}

const _postMedication = (prisma, name, dosage, dosage_frequency) => prisma.medication.create({
  data: {
    name: name,
    dosage: dosage,
    dosage_frequency: dosage_frequency
  }
});

const postMedication = async (prisma, name, dosage, dosage_frequency, callback) => {
  const medication = await _postMedication(prisma, name, dosage, dosage_frequency);
  callback(medication);
  console.log(medication);
}

export { getMedication, postMedication };
