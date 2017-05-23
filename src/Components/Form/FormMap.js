import CorrespondenceInfo from '../../Components/Form/CorrespondenceInfo'
import CreditBureau from '../../Components/Form/CreditBureau'
import DeclinedReasons from '../../Components/Form/DeclinedReasons'
import EAMPNPerson from '../../Components/Form/EAMPNPerson'
import Employer from '../../Components/Form/Employer'
import Person from '../../Components/Form/Person'
import Reference from '../../Components/Form/Reference'
import School from '../../Components/Form/School'

var FormMap = new Map()

var formArr = [{ id:1,value:CorrespondenceInfo},{id:2, value:CreditBureau}, 
{id:3,value:DeclinedReasons},{id:4,value:EAMPNPerson},{id:5,value:Employer},
{id:6,value:Person},{id:7,value:Reference},{id:8,value:School}]

formArr.forEach((form,index)=>(
    FormMap.set(form.id,form)
))

/*    FormMap.set(1, CorrespondenceInfo)
    FormMap.set(2, CreditBureau)
    FormMap.set(3, DeclinedReasons)
    FormMap.set(4, EAMPNPerson)
    FormMap.set(5, Employer)
    FormMap.set(6, Person)
    FormMap.set(7, Reference)
    FormMap.set(8, School)
*/
export default FormMap