def getCart(request):
    try:
        customer = request.user.customer
        cart, created = CartItem.objects.get_or_create(user=customer, last=True)
        cart.calculate_total()
        cart.quantity_sum
        serializer = CartItemSerializer(cart)
        print(serializer.data['panier_items'])
        response = JsonResponse(serializer.data, safe=True)
        response['Content-Type'] = 'application/json'
        return response
    except CartItem.DoesNotExist:
        logger_base.info('Aucun panier trouvé pour cet utilisateur')
        return JsonResponse({'error': 'Aucun panier trouvé pour cet utilisateur'}, status=404)
    except AttributeError:
        logger_base.error('L\'utilisateur n\'a pas de client associé')
        return JsonResponse({'error': 'L\'utilisateur n\'a pas de client associé'}, status=400)
    except Exception as e:
        logger_base.error(f'Erreur lors de la récupération du panier : {e}')
        return JsonResponse({'error': 'Une erreur est survenue lors de la récupération du panier'}, status=500)
