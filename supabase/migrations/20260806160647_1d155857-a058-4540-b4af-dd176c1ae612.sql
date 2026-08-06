REVOKE EXECUTE ON FUNCTION public.tg_row_audit() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.can_read_content(uuid, public.record_status, timestamptz) FROM anon, authenticated;