import {
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";
import {
  Bars,
  Gauge,
  Lines,
  Pie,
  Pyramid,
  Radar,
  Sankey,
  Scatter,
} from "../../components/Charts";
import {
  Avatar,
  Badge,
  Chip,
  Divider,
  Icons,
  iconNames,
  List,
  Table,
  Text,
  Tooltip,
  type IconName,
  type TableColumn,
  type TableData,
} from "../../components/DataDisplay";
import {
  Alert,
  Backdrop,
  Dialog,
  Progress,
  Skeleton,
  Snackbar,
  type SnackbarPlacement,
} from "../../components/Feedbacks";
import {
  Button,
  Calendar,
  Checkbox,
  DatePicker,
  Input,
  InputArea,
  Rating,
  Select,
  Slider,
  Switch,
  TimePicker,
} from "../../components/Form";
import { Box, Container, Flex, Grid } from "../../components/Layout";
import {
  Breadcrumbs,
  Drawer,
  FloatButton,
  Menu,
  Pagination,
  Stepper,
  Tabs,
} from "../../components/Navigation";
import { ThemeSwitcher } from "../../components/Styles";
import { Accordion, Card, Footer, Nav, Paper } from "../../components/Surfaces";
import "./Home.css";

type Demo = {
  id: string;
  title: string;
  description: string;
  category: string;
  preview: ReactNode;
  code: string;
  apiProps?: string[];
  apiNotes?: string;
};

const listItems = [{ content: "Elemento 1" }, { content: "Elemento 2" }];

const tableColumns: TableColumn<TableData>[] = [
  { key: "name", header: "Nombre" },
  { key: "role", header: "Rol" },
];

const tableData: TableData[] = [
  { name: "Ana", role: "Admin" },
  { name: "Luis", role: "Editor" },
];

const allIconNames: IconName[] = [...iconNames];

const apiPropsLookup: Record<string, string[]> = {
  button: ["variant", "size", "block", "disabled", "icon", "type", "onClick"],
  input: [
    "type",
    "value",
    "defaultValue",
    "placeholder",
    "onChange",
    "disabled",
    "required",
  ],
  "input-area": ["rows", "maxLength", "placeholder", "value", "onChange"],
  select: ["value", "defaultValue", "onChange", "disabled", "multiple"],
  checkbox: ["label", "checked", "defaultChecked", "onChange", "disabled"],
  switch: ["label", "checked", "onChange", "disabled"],
  slider: ["value", "min", "max", "step", "onChange", "disabled"],
  rating: ["value", "max", "onChange", "readOnly"],
  calendar: ["value", "onChange", "minDate", "maxDate"],
  "date-picker": ["value", "onChange", "minDate", "maxDate", "placeholder"],
  timepicker: ["value", "onChange", "format", "placeholder"],
  selectinput: ["value", "onChange", "options"],
  alert: ["tone", "title", "onClose", "icon", "actions"],
  progress: ["value", "max", "label"],
  skeleton: ["width", "height", "circle", "count"],
  snackbar: ["open", "message", "duration", "onClose", "placement"],
  dialog: ["open", "title", "actions", "onClose"],
  drawer: ["open", "placement", "header", "footer", "onClose"],
  menu: ["items", "onSelect", "placement"],
  tabs: ["tabs", "activeId", "onChange", "variant"],
  pagination: ["page", "totalPages", "onChange"],
  breadcrumbs: ["items", "separator"],
  floatbutton: ["icon", "tooltip", "onClick"],
  stepper: ["steps", "active"],
  card: ["title", "actions", "elevated", "children"],
  accordion: ["items", "defaultItemId", "onChange"],
  table: ["columns", "data", "emptyMessage"],
  list: ["items", "renderItem"],
  chip: ["label", "onRemove", "selected", "variant"],
  badge: ["tone", "children"],
  icons: ["name", "size", "color", "strokeWidth", "className", "style"],
  tooltip: ["content", "placement", "delay"],
  footer: ["links", "brand", "children"],
  nav: ["brand", "links", "actions"],
  container: ["maxWidth", "as", "fluid"],
  flex: ["align", "justify", "gap", "direction", "wrap"],
  grid: ["columns", "gap", "rows", "areas"],
  box: ["as", "padding", "margin"],
  paper: ["elevated", "padding", "bordered"],
};

export default function Home() {
  const [rating, setRating] = useState(3);
  const [sliderValue, setSliderValue] = useState(40);
  const [checkboxOn, setCheckboxOn] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);
  const [progressValue, setProgressValue] = useState(45);
  const [snackbarPlacement, setSnackbarPlacement] =
    useState<SnackbarPlacement>("bottom-right");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [stepperActive, setStepperActive] = useState(1);
  const [selectedId, setSelectedId] = useState("button");
  const [activeView, setActiveView] = useState<"preview" | "api">("preview");
  const [iconFilter, setIconFilter] = useState("");
  const [iconCopied, setIconCopied] = useState<string | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);

  const handleSlider = (event: ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(event.target.value));
  };

  const demos: Demo[] = useMemo(
    () => [
      // Form
      {
        id: "button",
        title: "Button",
        category: "Form",
        description:
          "Variantes: primary, secondary, ghost. Usa `block` para ancho completo.",
        preview: (
          <div className="demo-card__preview">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        ),
        code: `<Button variant="primary">Guardar</Button>`,
      },
      {
        id: "input",
        title: "Input",
        category: "Form",
        description: "Input base con todas las props HTML.",
        preview: (
          <div className="demo-card__preview">
            <Input placeholder="Tu nombre" />
            <Input type="email" placeholder="email@dominio.com" />
          </div>
        ),
        code: `<Input placeholder="Buscar" value={value} onChange={handleChange} />`,
      },
      {
        id: "input-area",
        title: "InputArea",
        category: "Form",
        description: "Textarea redimensionable. Pasa rows, maxLength, etc.",
        preview: (
          <div className="demo-card__preview">
            <InputArea placeholder="Escribe una nota" rows={3} />
          </div>
        ),
        code: `<InputArea rows={4} maxLength={240} placeholder="Descripcion" />`,
      },
      {
        id: "select",
        title: "Select",
        category: "Form",
        description: "Select nativo con opciones o children personalizados.",
        preview: (
          <div className="demo-card__preview">
            <Select defaultValue="opcion-1">
              <option value="opcion-1">Opcion 1</option>
              <option value="opcion-2">Opcion 2</option>
            </Select>
          </div>
        ),
        code: `<Select value={value} onChange={(e) => setValue(e.target.value)} />`,
      },
      {
        id: "checkbox",
        title: "Checkbox",
        category: "Form",
        description: "Checkbox con label opcional.",
        preview: (
          <div className="demo-card__preview">
            <Checkbox
              label="Aceptar terminos"
              checked={checkboxOn}
              onChange={(e) => setCheckboxOn(e.target.checked)}
            />
          </div>
        ),
        code: `<Checkbox label="Aceptar" checked={checked} onChange={onChange} />`,
      },
      {
        id: "switch",
        title: "Switch",
        category: "Form",
        description: 'Toggle accesible (`role="switch"`).',
        preview: (
          <div className="demo-card__preview">
            <Switch
              label={switchOn ? "Activado" : "Desactivado"}
              checked={switchOn}
              onChange={(e) => setSwitchOn(e.target.checked)}
            />
          </div>
        ),
        code: `<Switch checked={isOn} onChange={(e) => setIsOn(e.target.checked)} />`,
      },
      {
        id: "slider",
        title: "Slider",
        category: "Form",
        description: "Range control con min/max/step.",
        preview: (
          <div className="demo-card__preview">
            <Slider
              min={0}
              max={100}
              value={sliderValue}
              onChange={handleSlider}
            />
            <span className="demo-card__meta">{sliderValue}</span>
          </div>
        ),
        code: `<Slider min={0} max={100} value={value} onChange={handleChange} />`,
      },
      {
        id: "rating",
        title: "Rating",
        category: "Form",
        description: "Control con max, value, onChange e icon opcional.",
        preview: (
          <div className="demo-card__preview">
            <Rating value={rating} onChange={setRating} />
            <span className="demo-card__meta">{rating} / 5</span>
          </div>
        ),
        code: `<Rating value={score} onChange={setScore} />`,
      },
      {
        id: "calendar",
        title: "Calendar",
        category: "Form",
        description: "Input de fecha con min/max.",
        preview: (
          <div className="demo-card__preview">
            <Calendar defaultValue="2025-01-01" />
          </div>
        ),
        code: `<Calendar value={date} onChange={onChange} />`,
      },
      {
        id: "date-picker",
        title: "DatePicker",
        category: "Form",
        description: "Fecha y hora (`datetime-local`).",
        preview: (
          <div className="demo-card__preview">
            <DatePicker />
          </div>
        ),
        code: `<DatePicker value={value} onChange={onChange} />`,
      },
      {
        id: "time-picker",
        title: "TimePicker",
        category: "Form",
        description: "Selector de hora.",
        preview: (
          <div className="demo-card__preview">
            <TimePicker defaultValue="12:00" />
          </div>
        ),
        code: `<TimePicker value={value} onChange={onChange} />`,
      },
      // Charts
      {
        id: "bars",
        title: "Bars",
        category: "Charts",
        description: "Grafico de barras (porcentaje).",
        preview: (
          <Bars
            title="Ventas"
            data={[
              { label: "Q1", value: 40 },
              { label: "Q2", value: 65, color: "#f59e0b" },
              { label: "Q3", value: 80, color: "#22c55e" },
            ]}
          />
        ),
        code: `<Bars title="Ventas" data={[{ label: "Q1", value: 40 }]} />`,
      },
      {
        id: "lines",
        title: "Lines",
        category: "Charts",
        description: "Placeholder de lineas (series).",
        preview: (
          <Lines
            title="Trafico"
            series={[
              { name: "Organico", points: [20, 40, 60] },
              { name: "Pago", points: [15, 25, 45] },
            ]}
          />
        ),
        code: `<Lines title="Serie" series={[{ name: "A", points: [1,2,3] }]} />`,
      },
      {
        id: "pie",
        title: "Pie",
        category: "Charts",
        description: "Distribucion simple en porcentajes.",
        preview: (
          <Pie
            title="Segmentos"
            data={[
              { label: "A", value: 50, color: "#22c55e" },
              { label: "B", value: 30, color: "#2563eb" },
              { label: "C", value: 20, color: "#f97316" },
            ]}
          />
        ),
        code: `<Pie data={[{ label: "A", value: 50 }]} />`,
      },
      {
        id: "gauge",
        title: "Gauge",
        category: "Charts",
        description: "Indicador lineal con valor y porcentaje.",
        preview: <Gauge title="Complecion" value={72} />,
        code: `<Gauge title="Complecion" value={72} />`,
      },
      {
        id: "radar",
        title: "Radar",
        category: "Charts",
        description: "Radar dinamico con ejes filtrables.",
        preview: (
          <Radar
            title="Skills"
            axes={[
              { label: "UX", value: 70 },
              { label: "UI", value: 88 },
              { label: "FE", value: 82 },
              { label: "BE", value: 55 },
              { label: "Data", value: 46 },
            ]}
          />
        ),
        code: `<Radar title="Skills" axes={[{ label: "UX", value: 70 }]} />`,
      },
      {
        id: "scatter",
        title: "Scatter",
        category: "Charts",
        description: "Dispercion con toggles por punto.",
        preview: (
          <Scatter
            title="Clustes"
            points={[
              { label: "Norte", x: 12, y: 22 },
              { label: "Sur", x: 30, y: 10 },
              { label: "Oeste", x: 18, y: 35 },
              { label: "Este", x: 42, y: 28 },
            ]}
          />
        ),
        code: `<Scatter title="Clusters" points={[{ label: "Norte", x: 12, y: 22 }]} />`,
      },
      {
        id: "pyramid",
        title: "Pyramid",
        category: "Charts",
        description: "Niveles en piramide con activacion por nivel.",
        preview: (
          <Pyramid
            title="Embudo"
            levels={[
              { label: "Leads", value: 100 },
              { label: "MQL", value: 65 },
              { label: "SQL", value: 42 },
              { label: "Ganadas", value: 24 },
            ]}
          />
        ),
        code: `<Pyramid title="Embudo" levels={[{ label: "Leads", value: 100 }]} />`,
      },
      {
        id: "sankey",
        title: "Sankey",
        category: "Charts",
        description: "Flujos entre nodos con encendido/apagado por enlace.",
        preview: (
          <Sankey
            title="Flujos"
            links={[
              { from: "Ads", to: "Leads", value: 120 },
              { from: "Org", to: "Leads", value: 80 },
              { from: "Leads", to: "Ventas", value: 60 },
              { from: "Leads", to: "Soporte", value: 40 },
            ]}
          />
        ),
        code: `<Sankey title="Flujos" links={[{ from: "Ads", to: "Leads", value: 120 }]} />`,
      },
      // DataDisplay
      {
        id: "avatar",
        title: "Avatar",
        category: "DataDisplay",
        description: "Iniciales o imagen, configurable en tamano.",
        preview: (
          <div className="demo-card__preview">
            <Avatar name="Elena Ruiz" />
            <Avatar name="UX" size={36} />
          </div>
        ),
        code: `<Avatar name="Elena Ruiz" />`,
      },
      {
        id: "badge",
        title: "Badge",
        category: "DataDisplay",
        description: "Etiqueta de estado.",
        preview: (
          <div className="demo-card__preview">
            <Badge color="blue">Nuevo</Badge>
            <Badge color="green">Listo</Badge>
          </div>
        ),
        code: `<Badge color="blue">Nuevo</Badge>`,
      },
      {
        id: "chip",
        title: "Chip",
        category: "DataDisplay",
        description: "Chip con opcion de quitar.",
        preview: (
          <div className="demo-card__preview">
            <Chip onRemove={() => undefined}>Filtro activo</Chip>
            <Chip>Sin accion</Chip>
          </div>
        ),
        code: `<Chip onRemove={handleRemove}>Filtro</Chip>`,
      },
      {
        id: "divider",
        title: "Divider",
        category: "DataDisplay",
        description: "Linea divisoria.",
        preview: (
          <div className="demo-card__preview">
            <Text>Arriba</Text>
            <Divider />
            <Text>Abajo</Text>
          </div>
        ),
        code: `<Divider />`,
      },
      {
        id: "icons",
        title: "Icons",
        category: "DataDisplay",
        description: "Iconos SVG personalizables por color y tamaño.",
        preview: (
          <div className="demo-card__preview demo-card__preview--icons">
            <div className="icons-toolbar">
              <Input
                placeholder="Filtra por nombre (ej. arrow, github, dog)"
                value={iconFilter}
                onChange={(e) => setIconFilter(e.target.value)}
                style={{ width: "100%", maxWidth: "320px" }}
              />
              {iconCopied ? (
                <span className="demo-card__meta">
                  Icono copiado: {iconCopied}
                </span>
              ) : null}
            </div>
            <div className="icons-grid">
              {allIconNames
                .filter((name) =>
                  name.toLowerCase().includes(iconFilter.toLowerCase())
                )
                .map((name) => (
                  <button
                    key={name}
                    type="button"
                    className="icon-card"
                    onClick={async () => {
                      const snippet = `<Icons name="${name}" />`;
                      try {
                        await navigator.clipboard.writeText(snippet);
                        setIconCopied(name);
                        setTimeout(() => setIconCopied(null), 1600);
                      } catch {
                        setIconCopied("Error al copiar");
                      }
                    }}
                  >
                    <Icons name={name as IconName} size="md" />
                    <span>{name}</span>
                  </button>
                ))}
            </div>
          </div>
        ),
        code: `<Icons name="spark" color="#2563eb" size="md" />`,
      },
      {
        id: "list",
        title: "List",
        category: "DataDisplay",
        description: "Lista con meta y descripcion.",
        preview: (
          <div className="demo-card__preview">
            <List items={listItems} />
          </div>
        ),
        code: `<List items={[{ title: "Item", meta: "OK" }]} />`,
      },
      {
        id: "table",
        title: "Table",
        category: "DataDisplay",
        description: "Tabla simple con columnas y filas.",
        preview: (
          <div className="demo-card__preview">
            <Table columns={tableColumns} data={tableData} />
          </div>
        ),
        code: `<Table columns={cols} data={rows} />`,
      },
      {
        id: "text",
        title: "Text",
        category: "DataDisplay",
        description: "Texto con tonos y pesos.",
        preview: (
          <div className="demo-card__preview">
            <Text weight="bold">Titulo</Text>
            <Text tone="muted">Descripcion</Text>
            <Text tone="danger">Error</Text>
          </div>
        ),
        code: `<Text tone="muted">Nota</Text>`,
      },
      {
        id: "tooltip",
        title: "Tooltip",
        category: "DataDisplay",
        description: "Tooltip on hover.",
        preview: (
          <div className="demo-card__preview">
            <Tooltip content="Cubo">
              <Icons name="cube" />
            </Tooltip>
          </div>
        ),
        code: `<Tooltip content="Cubo"><Icons name="cube" /></Tooltip>`,
      },
      // Feedbacks
      {
        id: "alert",
        title: "Alert",
        category: "Feedbacks",
        description: "Mensajes por tono (info, success, warning, error).",
        preview: (
          <div className="demo-card__preview">
            <Alert tone="info" title="Aviso">
              Texto breve.
            </Alert>
            <Alert tone="success" title="Aviso">
              Texto breve.
            </Alert>
            <Alert tone="warning" title="Aviso">
              Texto breve.
            </Alert>
            <Alert tone="error" title="Aviso">
              Texto breve.
            </Alert>
          </div>
        ),
        code: `<Alert tone="info" title="Aviso">Texto</Alert>`,
      },
      {
        id: "progress",
        title: "Progress",
        category: "Feedbacks",
        description: "Barra de progreso con etiqueta.",
        preview: (
          <div className="demo-card__preview">
            <Progress value={progressValue} label="Carga" />
            <div
              style={{
                display: "flex",
                gap: "0.4rem",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                variant="secondary"
                onClick={() => setProgressValue((v) => Math.max(0, v - 10))}
              >
                -10%
              </Button>
              <Button
                variant="primary"
                onClick={() => setProgressValue((v) => Math.min(100, v + 10))}
              >
                +10%
              </Button>
            </div>
          </div>
        ),
        code: `<Progress value={45} label="Carga" />`,
      },
      {
        id: "dialog",
        title: "Dialog",
        category: "Feedbacks",
        description: "Modal centrado con header y acciones.",
        preview: (
          <div className="demo-card__preview">
            <Dialog
              open={dialogOpen}
              title="Confirmar"
              actions={
                <>
                  <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setDialogOpen(false)}>Aceptar</Button>
                </>
              }
            >
              ?Continuar con la accion?
            </Dialog>
            <Button onClick={() => setDialogOpen(true)}>Abrir</Button>
          </div>
        ),
        code: `<Dialog open={dialogOpen} title="Confirmar">Contenido</Dialog>`,
      },
      {
        id: "backdrop",
        title: "Backdrop",
        category: "Feedbacks",
        description: "Overlay semitransparente.",
        preview: (
          <div className="demo-card__preview">
            <Button onClick={() => setBackdropOpen(true)}>Mostrar</Button>
            <Backdrop
              open={backdropOpen}
              onClick={() => setBackdropOpen(false)}
            />
          </div>
        ),
        code: `<Backdrop open={open} onClick={close} />`,
      },
      {
        id: "skeleton",
        title: "Skeleton",
        category: "Feedbacks",
        description: "Placeholder de carga animado.",
        preview: (
          <div className="demo-card__preview">
            <Skeleton width={160} height={16} />
          </div>
        ),
        code: `<Skeleton width={160} height={16} />`,
      },
      {
        id: "snackbar",
        title: "Snackbar",
        category: "Feedbacks",
        description: "Notificacion temporal.",
        preview: (
          <div className="demo-card__preview">
            <Snackbar
              open={snackOpen}
              message="Guardado"
              onClose={() => setSnackOpen(false)}
              placement={snackbarPlacement}
            />
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Button onClick={() => setSnackOpen(true)}>Abrir</Button>
              <Select
                value={snackbarPlacement}
                onChange={(e) =>
                  setSnackbarPlacement(e.target.value as SnackbarPlacement)
                }
                style={{ width: "100%", maxWidth: 240 }}
              >
                <option value="top-left">Arriba izq</option>
                <option value="top-center">Arriba centro</option>
                <option value="top-right">Arriba der</option>
                <option value="bottom-left">Abajo izq</option>
                <option value="bottom-center">Abajo centro</option>
                <option value="bottom-right">Abajo der</option>
              </Select>
            </div>
          </div>
        ),
        code: `<Snackbar open={snackOpen} message="Listo" onClose={close} />`,
      },
      // Layout
      {
        id: "container",
        title: "Container",
        category: "Layout",
        description: "Contenedor con max-width responsiva.",
        preview: (
          <div className="demo-card__preview">
            <Container>
              <Text>Contenido centrado</Text>
            </Container>
          </div>
        ),
        code: `<Container maxWidth="lg">...</Container>`,
      },
      {
        id: "flex",
        title: "Flex",
        category: "Layout",
        description: "Flex helper con gap, align, justify.",
        preview: (
          <div className="demo-card__preview">
            <Flex gap={8}>
              <Box>Item</Box>
              <Box>Item</Box>
            </Flex>
          </div>
        ),
        code: `<Flex gap={8} align="center" justify="between">...</Flex>`,
      },
      {
        id: "grid",
        title: "Grid",
        category: "Layout",
        description: "Grid con columnas fijas o auto-fit.",
        preview: (
          <div className="demo-card__preview">
            <Grid min="140px" gap={8}>
              <Box>Grid 1</Box>
              <Box>Grid 2</Box>
              <Box>Grid 3</Box>
            </Grid>
          </div>
        ),
        code: `<Grid min="140px" gap={12}>...</Grid>`,
      },
      {
        id: "box",
        title: "Box",
        category: "Layout",
        description: "Contenedor simple con borde y relleno.",
        preview: (
          <div className="demo-card__preview">
            <Box>Box content</Box>
          </div>
        ),
        code: `<Box>Contenido</Box>`,
      },
      // Navigation
      {
        id: "breadcrumbs",
        title: "Breadcrumbs",
        category: "Navigation",
        description: "Camino jerarquico.",
        preview: (
          <div className="demo-card__preview">
            <Breadcrumbs
              items={[{ label: "Inicio" }, { label: "UI" }, { label: "Tabs" }]}
            />
          </div>
        ),
        code: `<Breadcrumbs items={[{label:"Home"},{label:"UI"}]} />`,
      },
      {
        id: "tabs",
        title: "Tabs",
        category: "Navigation",
        description: "Tabs controladas con contenido.",
        preview: (
          <div className="demo-card__preview">
            <Tabs
              tabs={[
                { id: "uno", label: "Uno", content: "Contenido uno" },
                { id: "dos", label: "Dos", content: "Contenido dos" },
              ]}
            />
          </div>
        ),
        code: `<Tabs tabs={[{id:"a",label:"A",content:"..."}]} />`,
      },
      {
        id: "pagination",
        title: "Pagination",
        category: "Navigation",
        description: "Paginador simple.",
        preview: (
          <div className="demo-card__preview">
            <Pagination
              page={page}
              totalPages={5}
              onChange={(page) => setPage(Number(page))}
            />
          </div>
        ),
        code: `<Pagination page={1} totalPages={5} onChange={setPage} />`,
      },
      {
        id: "stepper",
        title: "Stepper",
        category: "Navigation",
        description: "Pasos con estado activo/completado.",
        preview: (
          <div className="demo-card__preview" style={{ gap: "0.75rem" }}>
            <Stepper
              steps={[{ label: "Plan" }, { label: "Build" }, { label: "Ship" }]}
              active={stepperActive}
            />
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button
                variant="secondary"
                onClick={() =>
                  setStepperActive((prev) => Math.max(prev - 1, 0))
                }
              >
                Anterior
              </Button>
              <Button
                variant="primary"
                onClick={() =>
                  setStepperActive((prev) => Math.min(prev + 1, 2))
                }
              >
                Siguiente
              </Button>
            </div>
          </div>
        ),
        code: `<Stepper steps={[{label:"Plan"},{label:"Build"},{label:"Ship"}]} active={active} />`,
      },
      {
        id: "menu",
        title: "Menu",
        category: "Navigation",
        description: "Menu contextual simple.",
        preview: (
          <div className="demo-card__preview">
            <Menu items={[{ label: "Perfil" }, { label: "Salir" }]} />
          </div>
        ),
        code: `<Menu items={[{label:"Perfil"}]} />`,
      },
      {
        id: "drawer",
        title: "Drawer",
        category: "Navigation",
        description: "Panel lateral.",
        preview: (
          <div className="demo-card__preview">
            <Button onClick={() => setDrawerOpen(true)}>Abrir</Button>
            <Drawer
              open={drawerOpen}
              placement="right"
              header="Panel"
              footer={
                <Button onClick={() => setDrawerOpen(false)}>Cerrar</Button>
              }
            >
              Contenido lateral
            </Drawer>
          </div>
        ),
        code: `<Drawer open={open} placement="right">Contenido</Drawer>`,
      },
      {
        id: "float-button",
        title: "FloatButton",
        category: "Navigation",
        description: "Boton flotante.",
        preview: (
          <div className="demo-card__preview">
            <FloatButton />
          </div>
        ),
        code: `<FloatButton />`,
      },
      // Surfaces
      {
        id: "accordion",
        title: "Accordion",
        category: "Surfaces",
        description: "Paneles plegables con un item abierto.",
        preview: (
          <div className="demo-card__preview">
            <Accordion
              items={[
                { id: "a", title: "Seccion A", content: "Detalle A" },
                { id: "b", title: "Seccion B", content: "Detalle B" },
              ]}
            />
          </div>
        ),
        code: `<Accordion items={[{id:"a",title:"A",content:"..."}]} />`,
      },
      {
        id: "card",
        title: "Card",
        category: "Surfaces",
        description: "Tarjeta con header opcional y acciones.",
        preview: (
          <div className="demo-card__preview">
            <Card title="Card" actions={<Button>Accion</Button>}>
              Cuerpo de la tarjeta.
            </Card>
          </div>
        ),
        code: `<Card title="Card">Contenido</Card>`,
      },
      {
        id: "nav",
        title: "Nav",
        category: "Surfaces",
        description: "Barra superior con brand y acciones.",
        preview: (
          <div className="demo-card__preview">
            <Nav brand="Vertex UI" actions={<Button>Accion</Button>}>
              <Button variant="ghost">Link</Button>
            </Nav>
          </div>
        ),
        code: `<Nav brand="Brand">Links</Nav>`,
      },
      {
        id: "paper",
        title: "Paper",
        category: "Surfaces",
        description: "Panel con elevacion configurable.",
        preview: (
          <div className="demo-card__preview">
            <Paper elevation="lg">Panel con sombra.</Paper>
          </div>
        ),
        code: `<Paper elevation="lg">Contenido</Paper>`,
      },
      {
        id: "footer",
        title: "Footer",
        category: "Surfaces",
        description: "Footer con tres zonas.",
        preview: (
          <div className="demo-card__preview">
            <Footer left="(c) 2025" right="Soporte">
              Footer centrado
            </Footer>
          </div>
        ),
        code: `<Footer left="(c) 2025" right="Soporte">Centro</Footer>`,
      },
      // Styles / Theme
      {
        id: "theme-switcher",
        title: "ThemeSwitcher",
        category: "Styles",
        description: "Selector de tema claro/oscuro y paleta editable.",
        preview: (
          <div className="demo-card__preview">
            <ThemeSwitcher />
          </div>
        ),
        code: `<ThemeSwitcher />`,
      },
    ],
    [
      checkboxOn,
      page,
      rating,
      sliderValue,
      switchOn,
      drawerOpen,
      dialogOpen,
      snackOpen,
      backdropOpen,
      stepperActive,
      progressValue,
      snackbarPlacement,
      iconFilter,
      iconCopied,
    ]
  );

  const handleSelect = (id: string) => {
    setSelectedId(id);
    const el = document.getElementById(`demo-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const categories = Array.from(new Set(demos.map((d) => d.category)));

  const renderApiDoc = (demo: Demo) => {
    const props = demo.apiProps ?? apiPropsLookup[demo.id] ?? [];
    return (
      <div className="demo-card__doc">
        <p className="demo-card__doc-summary">
          {demo.apiNotes ?? demo.description}
        </p>
        <div className="demo-card__doc-section">
          <h4>Props</h4>
          <ul className="demo-card__doc-list">
            {props.map((prop) => (
              <li key={prop}>
                <code>{prop}</code>
              </li>
            ))}
            <li>
              <code>className?</code>, <code>style?</code> (comunes)
            </li>
          </ul>
        </div>
        <div className="demo-card__doc-section">
          <h4>Ejemplo</h4>
          <pre className="demo-card__code">
            <code>{demo.code}</code>
          </pre>
        </div>
      </div>
    );
  };

  return (
    <main className="home">
      <header className="home__header">
        <div className="home__header-top">
          <div className="home__header-copy">
            <p className="eyebrow">Guia de componentes reutilizables</p>
            <h1>All Might UI</h1>
            <p>
              Usa el menu lateral para ver un componente a la vez. Copia el
              snippet y adapta las props a tu app.
            </p>
          </div>
          <div className="home__view-toggle">
            <Button
              type="button"
              variant="ghost"
              className={activeView === "preview" ? "is-active" : ""}
              onClick={() => setActiveView("preview")}
            >
              Preview
            </Button>
            <Button
              type="button"
              variant="ghost"
              className={activeView === "api" ? "is-active" : ""}
              onClick={() => setActiveView("api")}
            >
              API doc
            </Button>
          </div>
        </div>
      </header>

      <div className="home__layout">
        <article className="home__sidebar" aria-label="Componentes">
          <h3>Componentes</h3>
          <ul>
            {categories.map((cat) => (
              <li key={cat} className="sidebar__category">
                <span className="sidebar__category-title">{cat}</span>
                <ul>
                  {demos
                    .filter((demo) => demo.category === cat)
                    .map((demo) => (
                      <li key={demo.id}>
                        <button
                          type="button"
                          className={
                            demo.id === selectedId
                              ? "sidebar__link is-active"
                              : "sidebar__link"
                          }
                          onClick={() => handleSelect(demo.id)}
                          aria-current={
                            demo.id === selectedId ? "page" : undefined
                          }
                        >
                          {demo.title}
                        </button>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </article>

        <section className="home__content" ref={contentRef}>
          {demos.map((demo) => (
            <article key={demo.id} id={`demo-${demo.id}`} className="demo-card">
              <div className="demo-card__header">
                <div>
                  <p className="demo-card__category">{demo.category}</p>
                  <h2>{demo.title}</h2>
                  <p>{demo.description}</p>
                </div>
              </div>
              {activeView === "preview" ? (
                <>
                  <div className="demo-card__preview">{demo.preview}</div>
                  <pre className="demo-card__code">
                    <code>{demo.code}</code>
                  </pre>
                </>
              ) : (
                renderApiDoc(demo)
              )}
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
