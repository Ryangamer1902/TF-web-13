// Documentação Swagger para a rota de upload de documentos
module.exports = {
  "/api/documentos/upload": {
    post: {
      tags: ["Documentos"],
      summary: "Upload de documento PDF",
      description: "Faz upload de um arquivo PDF e associa ao usuário autenticado.",
      consumes: ["multipart/form-data"],
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                file: {
                  type: "string",
                  format: "binary",
                  description: "Arquivo PDF a ser enviado"
                }
              },
              required: ["file"]
            }
          }
        }
      },
      responses: {
        201: {
          description: "Upload realizado com sucesso!",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string" },
                  documento: {
                    type: "object",
                    properties: {
                      id: { type: "integer" },
                      documento: { type: "string" },
                      id_user: { type: "integer" },
                      createdAt: { type: "string", format: "date-time" },
                      updatedAt: { type: "string", format: "date-time" }
                    }
                  }
                }
              }
            }
          }
        },
        400: {
          description: "Requisição inválida ou arquivo não é PDF",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: { type: "string" }
                }
              }
            }
          }
        },
        500: {
          description: "Erro interno ao fazer upload do documento",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: { type: "string" }
                }
              }
            }
          }
        }
      }
    }
  }
};
