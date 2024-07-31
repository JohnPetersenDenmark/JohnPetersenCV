import { currentApplicationData } from '../../GlobalData/GlobalApplicationData';



function CustomerInfo() {



  return (
    <div>
      <p className='customer_paragraph'>
        {currentApplicationData.EmployerInfo.name}
      </p>
      <p className='customer_paragraph'>
        {currentApplicationData.EmployerInfo.AddressLine1}
      </p>
      <p className='customer_paragraph'>
        {currentApplicationData.EmployerInfo.AddressLine2}
      </p>
      <p className='customer_paragraph'>
        {currentApplicationData.EmployerInfo.zipcode} {currentApplicationData.EmployerInfo.city}
      </p>
      <p className='customer_paragraph'>
        {currentApplicationData.EmployerInfo.attention}
      </p>



    </div>
  );
}

export default CustomerInfo; 