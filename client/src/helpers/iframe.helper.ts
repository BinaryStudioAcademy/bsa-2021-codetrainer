const TaskDescriptionIframeStyles = `
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap');

  body {
    font-family: 'Montserrat', Arial, sans-serif;
    overflow: hidden;
    overflow-y: auto;
  }

  body::-webkit-scrollbar {
    width: 6px;
  }
  
  body::-webkit-scrollbar-thumb {
    background-color: rgba(236, 65, 121, 0.3);
    border-radius: 10px;
  }
  
  body:hover::-webkit-scrollbar-thumb {
    background-color: rgba(236, 65, 121, 0.6);
  }
  
  body p {
    margin: 15px 0 0;
  
    font-size: 14px;
    font-weight: 400;
  }
  
  body ul {
    position: relative;
    margin: 20px 0 0;
    padding: 0 0 0 18px;
  
    list-style: none;
  }
  
  body li {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: normal;
  }
  
  body li::before {
    position: absolute;
    left: 0;
    content: '●';
  
    color: #ec4179;
  }
  
  body h6 {
    margin: 18px 0;
  
    font-size: 16px;
    font-weight: 600;
  }
  
  body div div {
    margin: 18px 0;
    padding: 8px 10px;
    width: 95%;
  
    background: #EAECF1;
    border-radius: 10px;
  }
  
  body code {
    font-size: 14px;
    font-weight: 400;
  }
  </style>
`;

export const insertStylesInIframe = (iframeId: string): void => {
	const iframe = document.getElementById(iframeId) as HTMLIFrameElement;
	const iDocument = iframe.contentDocument;

	if (iDocument) {
		iDocument.head.innerHTML = iDocument.head.innerHTML + TaskDescriptionIframeStyles;
	}
};
