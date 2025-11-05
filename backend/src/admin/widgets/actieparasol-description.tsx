// MainDescriptionWrapper.tsx
import { DetailWidgetProps, AdminProductCategory } from "@medusajs/framework/types";
import { useQuery } from "@tanstack/react-query";
// MainDescriptionForm.tsx
import { Button, Container, FocusModal, Heading, Label } from "@medusajs/ui";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import TiptapEditor from "../components/CKEditor";
import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { sdk } from "../lib/sdk";

const MainDescriptionWrapper = ({
  data: productCategory,
}: DetailWidgetProps<AdminProductCategory>) => {
  const { data: queryResult } = useQuery({
    queryKey: ["productCategory", productCategory.id],
    queryFn: () => sdk.admin.product.retrieve(productCategory.id),
  });

  if (!queryResult) return <div>Loading...</div>;

  return (
    <MainDescriptionForm
      productCategoryId={productCategory.id}
      metadata={queryResult.product.metadata || {}}
    />
  );
};

type CustomFields = {
  actieparasoldescription: string;
};

type Props = {
  productCategoryId: string;
  metadata: any;
};

const MainDescriptionForm = ({ productCategoryId, metadata }: Props) => {
  const form = useForm<CustomFields>({
    defaultValues: {
      actieparasoldescription: metadata.actieparasoldescription || ""
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: CustomFields) =>
      sdk.admin.product.update(productCategoryId, {
        metadata: { ...metadata, ...data },
      }),
    onSuccess: (_, variables) => {
      // direct resetten van de form met nieuwe values
      form.reset({ ...metadata, ...variables });
      console.log("✅ Metadata updated");
    },
    onError: (err) => {
      console.error("❌ Failed to update metadata", err);
    },
  });

  const onSubmit: SubmitHandler<CustomFields> = (data) => updateMutation.mutate(data);

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Productbeschrijving</Heading>
      </div>

      <FocusModal>
        <FocusModal.Trigger asChild>
          <Button>Actieparasol beschrijving</Button>
        </FocusModal.Trigger>
        <FocusModal.Content>
          <FocusModal.Header>
            <FocusModal.Title>Edit Description</FocusModal.Title>
          </FocusModal.Header>

          <FocusModal.Body className="flex flex-col items-center py-4 max-h-[70vh] overflow-y-auto">
            <div className="flex w-full max-w-lg flex-col gap-y-8">
              <FormProvider<CustomFields> {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                <Label>Main description</Label>
                  <TiptapEditor
                    value={form.watch("actieparasoldescription") || ""}
                    onChange={(value) => form.setValue("actieparasoldescription", value)}
                  />
                  <Button type="submit" className="mt-4">Save</Button>
                </form>
              </FormProvider>
            </div>
          </FocusModal.Body>
        </FocusModal.Content>
      </FocusModal>
    </Container>
  );
};

export const config = defineWidgetConfig({
  zone: "product.details.after",
});

export default MainDescriptionWrapper;
