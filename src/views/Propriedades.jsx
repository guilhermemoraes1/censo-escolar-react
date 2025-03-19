import PropriedadesTable from '../components/PropriedadesTable';
import { Button, Form, Modal} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { object, string, number } from 'yup';
import { usePropriedadesContext } from '../contexts/PropriedadesContext';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';

const Propriedades = () => {
  const {
    propriedades,
    setPropriedades,
    show,
    handleShow,
    handleClose,
  } = usePropriedadesContext();

  let instituicoesSchema = object({
    Regiao: string().min(2).required(),
    NO_UF: string().min(2).max(3).required(),
    NO_MUNICIPIO: string().min(2).required(),
    NO_MESORREGIAO: string().min(2).required(),
    NO_MICRORREGIAO: string().min(2).required(),
    NO_ENTIDADE: string().min(2).min(5).required(),
    QT_MAT_BAS: number().required(),
    QT_MAT_INF: number().required(),
    QT_MAT_FUND: number().required(),
    QT_MAT_MED: number().required(),
    QT_MAT_EJA: number().required(),
    QT_MAT_ESP: number().required(),
  });

  const handleSubmit = async (values, actions) => {

    try {
        await instituicoesSchema.validate(values, { abortEarly: false });

        fetch('http://localhost:3000/instituicoes', {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
        .then((response) => {
            if (response.ok) {
                setPropriedades([values, ...propriedades]);
                handleClose();
                toast.success("Dados adicionados com sucesso.");
            }
        });
    } catch (err) {
        console.log(err.errors);
        toast.error(err.errors[0]);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'center', margin: '2rem'}}>
            <button className='botao' onClick={handleShow}>Cadastrar Nova Escola No Formulário</button>
      </div>

      <PropriedadesTable
        propriedades={propriedades}
        setPropriedades={setPropriedades}
      ></PropriedadesTable>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton className='botao'>
          <Modal.Title id="example-modal-sizes-title-lg">Cadastrar</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={{
            Regiao: '',
            NO_UF: '',
            NO_MUNICIPIO: '',
            NO_MESORREGIAO: '',
            NO_MICRORREGIAO: '',
            NO_ENTIDADE: '',
            QT_MAT_BAS: '',
            QT_MAT_INF: '',
            QT_MAT_FUND: '',
            QT_MAT_MED: '',
            QT_MAT_EJA: '',
            QT_MAT_ESP: ''
          }}
          validationSchema={instituicoesSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
          <FormikForm>
          <Modal.Body>
          <Form.Group className="mb-3">
              <Form.Label>Região</Form.Label>
              <Field
                type="text"
                placeholder="Sítio Aruara"
                id="Regiao"
                name="Regiao"
                value={values.Regiao}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
              />
              <ErrorMessage name="Regiao" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Field
                type="text"
                id="NO_UF"
                name="NO_UF"
                value={values.NO_UF}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
              />
              <ErrorMessage name="NO_UF" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Município</Form.Label>
              <Field
                type="text"
                id="NO_MUNICIPIO"
                name="NO_MUNICIPIO"
                value={values.NO_MUNICIPIO}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
              />
              <ErrorMessage name="NO_MUNICIPIO" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mesorregião</Form.Label>
              <Field
                type="text"
                id="NO_MESORREGIAO"
                name="NO_MESORREGIAO"
                value={values.NO_MESORREGIAO}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
              />
              <ErrorMessage name="NO_MESORREGIAO" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Microrregião</Form.Label>
              <Field
                type="text"
                id="NO_MICRORREGIAO"
                name="NO_MICRORREGIAO"
                value={values.NO_MICRORREGIAO}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
              />
              <ErrorMessage name="NO_MICRORREGIAO" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Escola</Form.Label>
              <Field
                type="text"
                id="NO_ENTIDADE"
                name="NO_ENTIDADE"
                value={values.NO_ENTIDADE}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
              />
              <ErrorMessage name="NO_ENTIDADE" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantidade de Matrícula Geral</Form.Label>
              <Field
                type="number"
                id="QT_MAT_BAS"
                name="QT_MAT_BAS"
                value={values.QT_MAT_BAS}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
              />
              <ErrorMessage name="QT_MAT_BAS" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantidade de Matrícula Infantil</Form.Label>
              <Field
                type="number"
                id="QT_MAT_INF"
                name="QT_MAT_INF"
                value={values.QT_MAT_INF}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
              />
              <ErrorMessage name="QT_MAT_INF" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantidade de Matrícula Fundamental</Form.Label>
              <Field
                type="number"
                id="QT_MAT_FUND"
                name="QT_MAT_FUND"
                value={values.QT_MAT_FUND}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
              />
              <ErrorMessage name="QT_MAT_FUND" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantidade de Matrícula Ensino Médio</Form.Label>
              <Field
                type="number"
                id="QT_MAT_MED"
                name="QT_MAT_MED"
                value={values.QT_MAT_MED}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
              />
              <ErrorMessage name="QT_MAT_MED" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantidade de Matrícula EJA</Form.Label>
              <Field
                type="number"
                id="QT_MAT_EJA"
                name="QT_MAT_EJA"
                value={values.QT_MAT_EJA}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
              />
              <ErrorMessage name="QT_MAT_EJA" component="div" className="text-danger" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantidade de Matrícula Especial</Form.Label>
              <Field
                type="number"
                id="QT_MAT_ESP"
                name="QT_MAT_ESP"
                value={values.QT_MAT_ESP}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
              />
              <ErrorMessage name="QT_MAT_ESP" component="div" className="text-danger" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button className='botao' type="button" onClick={handleClose}>
              Fechar
            </button>
            <button className='botao' type="submit" >
              Adicionar
            </button>
          </Modal.Footer>
          </FormikForm>
          )}
        </Formik>
      </Modal>
      
    </>
  );
};

export default Propriedades;
