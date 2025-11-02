

function ApplicationStyling(props : any) {
  
   const sectionDivOuterStyle: React.CSSProperties = {
      ...props.cssStyles,
      margin: 0,
  /*     position : 'absolute',
      left: props.sectionPosition.startXPosition,
      top: props.sectionPosition.startYPosition */
   };

   const sectionInnerDivStyle: React.CSSProperties = {
      ...props.cssStyles,
      margin: 10
   };

   const paraGraphSectionStyle: React.CSSProperties = {
      ...props.cssStyles,
      margin: '10px', fontWeight: 700, fontSize: '20px', color: 'red'
   };

   const paraGraphStyle: React.CSSProperties = {
      ...props.cssStyles,
      margin: '10px'
   };

   return {
    sectionDivOuterStyle,
    sectionInnerDivStyle,
    paraGraphSectionStyle,
    paraGraphStyle
  };

}

export default ApplicationStyling
