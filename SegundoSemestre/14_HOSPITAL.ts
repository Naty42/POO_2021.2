class Patient {
    private id: string;
    private diagnositc: string;
    private sender: string;
    private doctors: Map<string, Doctor>;

    constructor(id: string){
        this.id = id;
        this.diagnositc = ""
        this.sender = ""
        this.doctors = new Map<string, Doctor> ()
    }

    getId():string{
        return this.id;
    }

    getDiagnostic():string{
        return this.diagnositc;
    }

    getSender():string{
        return this.sender;
    }

    getDoctors():Doctor[]{
        return [...this.doctors.values()]
    }

    addDoctor(doctor:Doctor):void {
        if(this.doctors.has(doctor.getSpeciality()))
            return
        this.doctors.set(doctor.getSpeciality(), doctor)
        doctor.addPatient(this);
    }

        removeDoctor(speciality: string){
            let doctor: Doctor | undefined = this.doctors.get(speciality);

            if(doctor !== undefined){
              this.doctors.delete(speciality)
              doctor.removePatient(this.id);
            }
    }

    toString(): string {
        let doctors = this.doctors.keys();
        return this.id + " [" + [...doctors].join(", ") + "]";
    }

}
class Doctor {
    private name: string
    private speciality: string;
    private sender: string;
    private patients: Map<string, Patient>;

    constructor(name:string, specially:string){
        this.name = name;
        this.speciality = specially
        this.sender = ""
        this.patients = new Map<string, Patient> ()
    }

    getName():string{
        return this.name;
    }

    getSpeciality():string{
        return this.speciality;
    }

    getSender():string{
        return this.sender;
    }

    getPatient(): Patient []{
        return [...this.patients.values()]
    }

    addPatient(patient: Patient):void {
        if(this.patients.has(patient.getId()))
            return
        this.patients.set(patient.getId(), patient)
        patient.addDoctor(this)
    }

    removePatient(id: string){
      let patient: Patient | undefined = this.patients.get(id);
      if(patient !== undefined){
        this.patients.delete(id)
        patient.removeDoctor(this.speciality);
      }
    }

    toString(): string {
        let patients = this.patients.keys();
        return this.name + " [" + [...patients].join(", ") + "]";
    }
}

class Hospital {
  private doctors: Map<string, Doctor>
  private patients: Map<string, Patient>

  constructor(){
    this.doctors = new Map<string, Doctor>()
    this.patients = new Map<string, Patient>()
  }

  addPatient(patient: Patient): void{
    if(!this.patients.has(patient.getId())){
      this.patients.set(patient.getId(), patient)
    }
  }

   addDoctor(doctor: Doctor): void{
    if(!this.doctors.has(doctor.getName())){
      this.doctors.set(doctor.getName(), doctor)
    }
  }

  getPatient(id: string): Patient{
    let patient: undefined | Patient = this.patients.get(id);
    if(patient === undefined)
      throw new Error("Paciente não foi encontrado");
    return patient;
  }

  getDoctor(name: string): Doctor{
    let doctor: undefined | Doctor = this.doctors.get(name);
    if(doctor === undefined)
      throw new Error ("Doutor não foi encontrado!");
    return doctor;
  }

  removePatient(id: string){
    let patient: Patient = this.getPatient(id);

    for(let doctor of patient.getDoctors()){
      doctor.removePatient(id);
    }
    this.patients.delete(id);
  }

  removeDoctor(name: string){
    let doctor: Doctor = this.getDoctor(name);

    for(let patient of doctor.getPatient()){
      patient.removeDoctor(doctor.getSpeciality());
    }
    this.doctors.delete(name);
  }

  connect(idPatient: string, nameDoctor: string){
    let patient: Patient = this.getPatient(idPatient)
    let doctor: Doctor = this.getDoctor(nameDoctor)

    patient.addDoctor(doctor);
  }

  disconnect(idPatient: string, nameDoctor: string){
    let patient: Patient = this.getPatient(idPatient)
    let doctor: Doctor = this.getDoctor(nameDoctor)

    patient.removeDoctor(doctor.getSpeciality())
  }

  public toString(): string {
        let patients = [...this.patients.values()].map(a => a.toString());
        let doctors = [...this.doctors.values()].map(d => d.toString());
        return "-- Patients:\n" + patients.join("\n") + "\n-- Doctors:\n" + doctors.join("\n");
    }
}

let hospital = new Hospital();
hospital.addPatient(new Patient("Yuri"));
hospital.addPatient(new Patient("João"));
hospital.addPatient(new Patient("Sara"));

hospital.addDoctor(new Doctor("Naty", "Psicóloga"));
hospital.addDoctor(new Doctor("Edoardo", "Fisioterapeuta"));
hospital.addDoctor(new Doctor("Savila", "Nutricionista"));

hospital.connect("Yuri", "Naty"); 
hospital.connect("Yuri", "Savila");
hospital.connect("João", "Edoardo");
hospital.connect("Sara", "Naty");

console.log(hospital.toString());

hospital.removeDoctor("Edoardo");

console.log(hospital.toString());
