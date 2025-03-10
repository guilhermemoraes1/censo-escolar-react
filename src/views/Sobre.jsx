import '../App.css';

const Sobre = () => {
  return (
    <>
      <div className="sobre-container">
        <h1 className="sobre-title">Sobre Nós</h1>
        <p>
          Bem-vindo ao <strong>ParaibaCensoEscolar.com</strong>, um portal dedicado a fornecer informações precisas e atualizadas sobre a educação no estado da Paraíba.
        </p>
        <p>
          Nosso objetivo é apoiar estudantes, pais, educadores e gestores públicos com dados acessíveis sobre a educação no estado, incluindo informações sobre matrículas, escolas e censos escolares.
        </p>
        <p>
          Trabalhamos para garantir que todos os cidadãos tenham acesso a informações que ajudem na tomada de decisões e melhorem a qualidade do ensino na região.
        </p>
        <h2>Missão</h2>
        <p>
          Nossa missão é democratizar o acesso à informação educacional e promover a transparência no setor público, fornecendo uma plataforma fácil de usar e confiável para todos os envolvidos na educação.
        </p>
        <h2>Visão</h2>
        <p>
          Ser referência em qualidade e confiabilidade no fornecimento de dados educacionais na Paraíba, contribuindo para o aprimoramento contínuo do sistema educacional.
        </p>
        <h2>Valores</h2>
        <ul className="valores-lista">
          <li>Transparência</li>
          <li>Compromisso com a educação</li>
          <li>Inovação</li>
          <li>Respeito à diversidade</li>
        </ul>
      </div>
    </>
  );
};

export default Sobre;
