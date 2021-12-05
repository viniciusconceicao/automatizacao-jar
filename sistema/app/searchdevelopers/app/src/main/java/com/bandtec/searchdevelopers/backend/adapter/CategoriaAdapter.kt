package com.bandtec.searchdevelopers.backend.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bandtec.searchdevelopers.R

class CategoriaAdapter (private val context: Context, val categoriaService: MutableList<CadastrarCategoriaAdapter>): RecyclerView.Adapter<CategoriaAdapter.UserViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CategoriaAdapter.UserViewHolder {
        val itemLista = LayoutInflater.from(context).inflate(R.layout.item_users, parent, false)
        val holder = UserViewHolder(itemLista)
        return holder
    }

    override fun onBindViewHolder(holder: CategoriaAdapter.UserViewHolder, position: Int) {
        holder.categoriaType.text = categoriaService[position].type

    }

    override fun getItemCount(): Int = categoriaService.size

    inner class  UserViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val categoriaType = itemView.findViewById<TextView>(R.id.title_category)
    }
}