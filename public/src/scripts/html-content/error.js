export const errorFeedback = (messageError)=> {
    return `
    <div id="card">
      <img src="./public/images/wab-cry.png" alt="sapo chorando" />
      <div id="space-text">
        <span>Oh, não...</span>
        <p>${messageError}</p>
      </div>
    </div>
    `
}