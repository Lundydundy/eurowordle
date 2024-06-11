const Rules = ({handleRuleDisplay, ruleDisplay, ruleDisplayClass}: any) => {
  return (
    <div onClick={handleRuleDisplay} className={ruleDisplayClass} style={{cursor: "pointer", background: "black", position: "absolute", display: ruleDisplay ? "flex" : "none", alignContent: "center", justifyContent: "center", verticalAlign: "middle", flexDirection: "column", border: "1px solid white", top: "20%", left:"0", right: "0", marginLeft: "auto", marginRight: "auto", padding: "2%", maxWidth: "430px", width:"90%", minWidth: "420px" }}>
        <h3 style={{ padding: 0, margin: 0 }}>Rules</h3>
        <div style={{ justifyContent: "left", alignItems: "center", display: "flex", maxWidth: "500px", marginLeft: "17%" }}>
        <div style={{ height: "20px", width: "20px", background: "#242424", display: "flex", justifyContent:"center", alignItems:"center", color: "white" }}>e</div><span style={{ verticalAlign: "middle", marginLeft: "2px" }}> The letter is not in the word</span>
        </div>
        <div style={{ justifyContent: "left", alignItems: "center", display: "flex", maxWidth: "500px", marginLeft: "17%" }}>
        <div style={{ height: "20px", width: "20px", background: "yellow", display: "flex", justifyContent:"center", alignItems:"center", color: "black" }}>e</div><span style={{ verticalAlign: "middle", marginLeft: "2px" }}> The letter is somewhere in the word</span>
        </div>
        <div style={{ justifyContent: "left", alignItems: "center", display: "flex", maxWidth: "500px", marginLeft: "17%" }}>
        <div style={{ height: "20px", width: "20px", background: "green", display: "flex", justifyContent:"center", alignItems:"center", color: "black" }}>e</div><span style={{ verticalAlign: "middle", marginLeft: "2px" }}> The letter is in the correct position</span>
        </div>
  </div>
  )
}

export default Rules